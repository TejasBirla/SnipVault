import Snippet from "../models/SnippetModel.js";
import User from "../models/UserModel.js";

export const createSnippet = async (req, res) => {
  try {
    const { title, language, code, description, tags, isPublic } = req.body;
    if (!title?.trim() || !language?.trim() || !code?.trim() || !tags?.length) {
      return res
        .status(400)
        .json({ success: false, message: "Fields cannot be empty" });
    }

    const newSnippet = await Snippet.create({
      title,
      language,
      code,
      description,
      author: req.user._id,
      tags,
      isPublic: isPublic ?? true,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { snippets: newSnippet._id },
    });

    return res.status(201).json({
      success: true,
      message: "Snippet created successfully",
      newSnippet,
    });
  } catch (error) {
    console.log("Error in createSnippets: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error please try again later",
    });
  }
};

export const editSnippet = async (req, res) => {
  const id = req.params.id;
  const { title, language, code, description, tags, isPublic } = req.body;

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }

    // Validation
    if (!title?.trim() || !language?.trim() || !code?.trim() || !tags?.length) {
      return res
        .status(400)
        .json({ success: false, message: "Fields cannot be empty" });
    }

    if (snippet.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Update snippet
    snippet.title = title;
    snippet.language = language;
    snippet.code = code;
    snippet.description = description;
    snippet.tags = tags;
    snippet.isPublic = isPublic;

    await snippet.save();

    return res.status(200).json({
      success: true,
      message: "Snippet updated successfully",
      snippet,
    });
  } catch (error) {
    console.log("Error in editSnippet: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

export const viewSnippets = async (req, res) => {
  const id = req.params.id;
  try {
    const snippet = await Snippet.findById(id).populate("author", "userName");
    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Snippet found", snippet });
  } catch (error) {
    console.log("Error in viewSnippets: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error please try again later" });
  }
};

export const exploreSnippets = async (req, res) => {
  try {
    const allSnips = await Snippet.find({
      author: { $ne: req.user._id },
      isPublic: true,
    })
      .populate("author", "userName")
      .sort({
        createdAt: -1,
      });

    console.log("Logged user-> ", req.user._id);

    if (!allSnips || allSnips.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No snippets available to explore" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Snippets found", allSnips });
  } catch (error) {
    console.log("Error in exploreSnippets: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error please try again later" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const snipId = req.params.id;
    const snippet = await Snippet.findById(snipId);

    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }

    const isAlreadyLiked = snippet?.likes.includes(userId);
    let updatedSnippet;
    if (isAlreadyLiked) {
      updatedSnippet = await Snippet.findByIdAndUpdate(
        snipId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
    } else {
      updatedSnippet = await Snippet.findByIdAndUpdate(
        snipId,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
    }

    return res
      .status(200)
      .json({
        success: true,
        liked: !isAlreadyLiked,
        likeCount: updatedSnippet.likes.length,
      });
  } catch (error) {
    console.log("Error in ToogleLike: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error please try again later" });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const id = req.params.id;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }

    if (snippet.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Access." });
    }

    await Snippet.deleteOne({ _id: id });

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { snippets: id } }
    );

    return res
      .status(200)
      .json({ success: true, message: "Snippet deleted successfully" });
  } catch (error) {
    console.log("Error occur in deleteSnippets: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error please try again later" });
  }
};
