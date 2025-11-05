const MockData = {
  title: "UseState in React",
  language: "React",
  tags: ["useState", "React Hooks"],
  code: `import React, { useState } from "react";

export default function ExampleSnippet() {
  const [counter, setCounter] = useState(0); //useState

  //Update function
  const updateCounter = () => {
    setCounter((prev) => prev + 1); //counter state update
  };

  return (
    <div>
      <h1>Count Value: {counter}</h1>
      <button onClick={updateCounter}>Increment Count</button>
    </div>
  );
};`,
  codeDescription:
    "This example demonstrates the useState hook in React. It manages a counter state and updates it on button click. Clicking the Increment Count button increases the displayed value dynamically.",
};

const mockSnippets = [
  {
    _id: "1",
    title: "React Counter Component",
    language: "react",
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;`,
    tags: ["react", "hooks", "ui"],
    isPublic: true,
    likes: 5,
    createdAt: "2025-09-22",
  },
  {
    _id: "2",
    title: "CSS Flex Center",
    language: "css",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    tags: ["css", "flexbox", "layout"],
    isPublic: false,
    likes: 2,
    createdAt: "2025-09-20",
  },
  {
    _id: "3",
    title: "Python Fibonacci",
    language: "python",
    code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a)
        a, b = b, a + b`,
    tags: ["python", "algorithm", "math"],
    isPublic: true,
    likes: 10,
    createdAt: "2025-09-19",
  },
  {
    _id: "4",
    title: "HTML Form Example",
    language: "html",
    code: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
  <button type="submit">Submit</button>
</form>`,
    tags: ["html", "form", "ui"],
    isPublic: true,
    likes: 3,
    createdAt: "2025-09-18",
  },
  {
    _id: "5",
    title: "JavaScript Array Filter",
    language: "javascript",
    code: `const numbers = [1,2,3,4,5];
const even = numbers.filter(n => n % 2 === 0);
console.log(even);`,
    tags: ["javascript", "array", "filter"],
    isPublic: false,
    likes: 4,
    createdAt: "2025-09-21",
  },
  {
    _id: "6",
    title: "Tailwind Button",
    language: "html",
    code: `<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click Me
</button>`,
    tags: ["tailwind", "button", "ui"],
    isPublic: true,
    likes: 6,
    createdAt: "2025-09-22",
  },
  {
    _id: "7",
    title: "Node.js Express Server",
    language: "nodejs",
    code: `const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    tags: ["nodejs", "express", "backend", "server"],
    isPublic: true,
    likes: 12,
    createdAt: "2025-09-22",
  },
  {
    _id: "8",
    title: "Responsive CSS Grid Layout",
    language: "css",
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.grid-item {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}`,
    tags: ["css", "grid", "responsive", "layout"],
    isPublic: true,
    likes: 8,
    createdAt: "2025-09-21",
  },
  {
    _id: "9",
    title: "Python Class Example",
    language: "python",
    code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I'm {self.age} years old.")

p1 = Person("Alice", 25)
p1.greet()`,
    tags: ["python", "oop", "class", "example"],
    isPublic: false,
    likes: 7,
    createdAt: "2025-09-20",
  },
  {
    _id: 11,
    title: "App.jsx overview",
    language: "react",
    code: `import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Navbar.jsx";
import Hero from "./components/Home/Hero.jsx";
import Footer from "./components/Home/Footer.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import ExampleSnip from "./components/snippets/ExampleSnip.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import CreateSnip from "./components/snippets/CreateSnip.jsx";
import MySnip from "./components/snippets/MySnip.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div data-theme="light"  >
        <Routes>
          {/* Main layout (with Navbar + Footer) */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Footer />
              </>
            }
          />
          <Route
            path="/example/snip"
            element={
              <>
                <Navbar />
                <ExampleSnip />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create/snippets" element={<CreateSnip />} />
          <Route path="/my-snippets" element={<MySnip />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
`,
    tags: ["javascript", "react", "app.jsx", "example"],
    isPublic: false,
    likes: 7,
    createdAt: "2025-09-20",
  },
  {
    _id: 12,
    title: "C++ Hello world program",
    language: "cpp",
    code: `#include<iostream>
    int main()
    {
      cout<<"Hello World";
      return 0;
    }`,
    tags: ["c++"],
    isPublic: false,
    likes: 7,
    createdAt: "2025-09-20",
  },
  {
    _id: 13,
    title: "Rust",
    language: "rust",
    code: `fn main() {
    // Print a greeting
    println!("Hello, world!");

    // Sum two numbers
    let a = 5;
    let b = 7;
    let sum = a + b;
    println!("The sum of {} and {} is {}", a, b, sum);
}
`,
    tags: ["rust"],
    isPublic: false,
    likes: 7,
    createdAt: "2025-09-20",
  },
  {
    _id: "14",
    title: "Insert New User",
    language: "mongodb",
    code: `db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30
});`,
    tags: ["database", "mongodb", "insert"],
  },
];

const mockTrendingSnippets = [
  {
    _id: "101",
    title: "JavaScript Debounce Function",
    language: "javascript",
    code: `function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    tags: ["javascript", "performance", "utils"],
    isPublic: true,
    likes: 42,
    createdAt: "2025-09-18",
  },
  {
    _id: "102",
    title: "Responsive CSS Grid Layout",
    language: "css",
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}`,
    tags: ["css", "grid", "responsive"],
    isPublic: true,
    likes: 35,
    createdAt: "2025-09-20",
  },
  {
    _id: "103",
    title: "Express.js JWT Auth Middleware",
    language: "nodejs",
    code: `import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
}`,
    tags: ["nodejs", "auth", "jwt"],
    isPublic: true,
    likes: 50,
    createdAt: "2025-09-21",
  },
  {
    _id: "104",
    title: "Python QuickSort",
    language: "python",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
    tags: ["python", "sorting", "algorithm"],
    isPublic: true,
    likes: 29,
    createdAt: "2025-09-19",
  },
  {
    _id: "105",
    title: "SQL Inner Join Example",
    language: "sql",
    code: `SELECT users.name, orders.product
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
    tags: ["sql", "database", "joins"],
    isPublic: true,
    likes: 31,
    createdAt: "2025-09-15",
  },
];

export { MockData, mockSnippets, mockTrendingSnippets };
