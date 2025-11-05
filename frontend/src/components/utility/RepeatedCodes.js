const getRandomColor = () => {
  const colors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-orange-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const languages = [
  // Programming Languages
  {
    label: "JavaScript",
    value: "javascript",
    syntax: "javascript",
    monacoLang: "javascript",
    icon: "devicon-javascript-plain colored",
  },
  {
    label: "React",
    value: "react",
    syntax: "jsx",
    monacoLang: "javascript",
    icon: "devicon-react-original colored",
  },
  {
    label: "Node.js",
    value: "nodejs",
    syntax: "javascript",
    monacoLang: "javascript",
    icon: "devicon-nodejs-plain-wordmark colored",
  },
  {
    label: "Python",
    value: "python",
    syntax: "python",
    monacoLang: "python",
    icon: "devicon-python-plain colored",
  },
  {
    label: "Java",
    value: "java",
    syntax: "java",
    monacoLang: "java",
    icon: "devicon-java-plain colored",
  },
  {
    label: "C",
    value: "c",
    syntax: "c",
    monacoLang: "c",
    icon: "devicon-c-original",
  },

  {
    label: "C++",
    value: "cpp",
    syntax: "cpp",
    monacoLang: "cpp",
    icon: "devicon-cplusplus-plain colored",
  },
  {
    label: "C#",
    value: "csharp",
    syntax: "csharp",
    monacoLang: "csharp",
    icon: "devicon-csharp-plain colored",
  },
  {
    label: "TypeScript",
    value: "typescript",
    syntax: "typescript",
    monacoLang: "typescript",
    icon: "devicon-typescript-plain colored",
  },
  {
    label: "Go",
    value: "go",
    syntax: "go",
    monacoLang: "go",
    icon: "devicon-go-plain colored",
  },
  {
    label: "Rust",
    value: "rust",
    syntax: "rust",
    monacoLang: "rust",
    icon: "devicon-rust-original colored",
  },
  {
    label: "Kotlin",
    value: "kotlin",
    syntax: "kotlin",
    monacoLang: "kotlin",
    icon: "devicon-kotlin-plain colored",
  },
  {
    label: "Swift",
    value: "swift",
    syntax: "swift",
    monacoLang: "swift",
    icon: "devicon-swift-plain colored",
  },
  {
    label: "PHP",
    value: "php",
    syntax: "php",
    monacoLang: "php",
    icon: "devicon-php-plain colored",
  },
  {
    label: "Ruby",
    value: "ruby",
    syntax: "ruby",
    monacoLang: "ruby",
    icon: "devicon-ruby-plain colored",
  },
  {
    label: "Dart",
    value: "dart",
    syntax: "dart",
    monacoLang: "dart",
    icon: "devicon-dart-plain colored",
  },
  {
    label: "Scala",
    value: "scala",
    syntax: "scala",
    monacoLang: "scala",
    icon: "devicon-scala-plain colored",
  },
  {
    label: "R",
    value: "r",
    syntax: "r",
    monacoLang: "r",
    icon: "devicon-r-original colored",
  },
  {
    label: "Lua",
    value: "lua",
    syntax: "lua",
    monacoLang: "lua",
    icon: "devicon-lua-plain colored",
  },
  {
    label: "Perl",
    value: "perl",
    syntax: "perl",
    monacoLang: "perl",
    icon: "devicon-perl-plain colored",
  },
  {
    label: "MATLAB",
    value: "matlab",
    syntax: "matlab",
    monacoLang: "matlab",
    icon: "devicon-matlab-plain colored",
  },

  // Web & Markup
  {
    label: "HTML",
    value: "html",
    syntax: "html",
    monacoLang: "html",
    icon: "devicon-html5-plain colored",
  },
  {
    label: "CSS",
    value: "css",
    syntax: "css",
    monacoLang: "css",
    icon: "devicon-css3-plain colored",
  },
  {
    label: "JSON",
    value: "json",
    syntax: "json",
    monacoLang: "json",
    icon: "",
  },
  {
    label: "Shell",
    value: "bash",
    syntax: "bash",
    monacoLang: "shell",
    icon: "devicon-bash-plain colored",
  },

  // Databases
  {
    label: "MySQL",
    value: "mysql",
    syntax: "sql",
    monacoLang: "sql",
    icon: "devicon-mysql-plain colored",
  },
  {
    label: "PostgreSQL",
    value: "postgresql",
    syntax: "sql",
    monacoLang: "sql",
    icon: "devicon-postgresql-plain colored",
  },
  {
    label: "MongoDB",
    value: "mongodb",
    syntax: "json",
    monacoLang: "json",
    icon: "devicon-mongodb-plain colored",
  },
  {
    label: "SQLite",
    value: "sqlite",
    syntax: "sql",
    monacoLang: "sql",
    icon: "devicon-sqlite-plain colored",
  },

  // Frameworks / Libraries
  {
    label: "Vue.js",
    value: "vue",
    syntax: "vue",
    monacoLang: "vue",
    icon: "devicon-vuejs-plain colored",
  },
  {
    label: "Angular",
    value: "angular",
    syntax: "typescript",
    monacoLang: "typescript",
    icon: "devicon-angularjs-plain colored",
  },
  {
    label: "Next.js",
    value: "nextjs",
    syntax: "javascript",
    monacoLang: "javascript",
    icon: "devicon-nextjs-original colored",
  },
];

const getMonacoLang = (lang) =>
  languages.find((l) => l.value === lang)?.monacoLang || "text";

const getIcons = (lang) => {
  return languages.find((l) => l.value === lang.toLowerCase())?.icon || "";
};

const getSyntax = (lang) => {
  return languages.find((l) => l.value === lang)?.syntax || "";
};

const getFormattedDate = (createdDate) => {
  const formattedDate = new Date(createdDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export {
  languages,
  getRandomColor,
  getMonacoLang,
  getIcons,
  getSyntax,
  getFormattedDate,
  getInitials,
};
