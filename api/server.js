const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const secretKey = "yourSecretKey"; // Change this to a secure secret key

// Mock user database
let users = [
  { id: 1, username: "admin", password: "admin123", role: "Admin" },
  { id: 2, username: "editor", password: "editor123", role: "Editor" },
  { id: 3, username: "writer", password: "writer123", role: "Writer" },
];

const generateToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, secretKey, { expiresIn: "1h" });
};

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user.id, user.username, user.role);
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

server.post("/api/users", (req, res) => {
  const { username, password, role } = req.body;

  // Check if the username is already taken
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password: bcrypt.hashSync(password, 10), // Hash the password
    role,
  };

  users.push(newUser);
  const token = generateToken(newUser.id, newUser.username, newUser.role);

  res
    .status(201)
    .json({
      token,
      user: { id: newUser.id, username: newUser.username, role: newUser.role },
    });
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { password, role } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user
  if (password) {
    users[userIndex].password = bcrypt.hashSync(password, 10); // Hash the new password
  }

  if (role) {
    users[userIndex].role = role;
  }

  res.json({ message: "User updated successfully", user: users[userIndex] });
});

server.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
