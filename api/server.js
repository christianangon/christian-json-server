const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const generateCustomToken = (userId, username, type) => {
  return `custom_token_${userId}`;
};

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const users = router.db.get("users");
  const user = users.find({ username, password }).value();

  if (user) {
    const token = generateCustomToken(user.id, user.username, user.type);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        type: user.type,
        name: user.firstname + " " + user.lastname,
      },
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

server.post("/api/logout", (req, res) => {
  // Simulate logout by invalidating the token (custom logic)
  const token = req.headers["authorization"];
  if (token && token.startsWith("custom_token_")) {
    res.json({ message: "Logout successful" });
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

server.post("/api/users/create", (req, res) => {
  const { username, password, type, firstname, lastname, status } = req.body;
  const users = router.db.get("users");
  const user = users.find({ username }).value();

  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    firstname,
    lastname,
    status,
    type,
  };

  // Update the users in the database
  router.db.get("users").push(newUser).write();

  // Respond with the updated data
  res.status(201).json({
    token: generateCustomToken(newUser.id, newUser.username, newUser.type),
    user: { id: newUser.id, username: newUser.username, type: newUser.type },
  });
});

server.get("/api/users/all", (req, res) => {
  const users = router.db.get("users");
  res.json(users);
});

server.put("/api/users/edit", (req, res) => {
  const userId = parseInt(req.params.id);
  const { password, type } = req.body;
  const users = router.db.get("users");
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user
  if (password) {
    users[userIndex].password = password;
  }

  if (type) {
    users[userIndex].type = type;
  }

  res.json({ message: "User updated successfully", user: users[userIndex] });
});

server.delete("/api/users/delete", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = router.db.get("users");
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted successfully" });
});

// Articles API
server.post("/api/articles/create", (req, res) => {
  const { title, content, userId } = req.body;
  const articles = router.db.get("articles");
  const newArticle = {
    id: articles.length + 1,
    companyId,
    image,
    title,
    link,
    date,
    content,
    writer,
    editor,
    status: "For Edit",
  };

  articles.push(newArticle);

  res
    .status(201)
    .json({ message: "Article created successfully", article: newArticle });
});

server.get("/api/articles/all", (req, res) => {
  const articles = router.db.get("articles");
  res.json(articles);
});

server.put("/api/articles/edit", (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content } = req.body;

  const articleIndex = articles.findIndex((a) => a.id === articleId);

  if (articleIndex === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  // Update the article
  if (title) {
    articles[articleIndex].title = title;
  }

  if (content) {
    articles[articleIndex].content = content;
  }

  res.json({
    message: "Article updated successfully",
    article: articles[articleIndex],
  });
});

server.delete("/api/articles/delete", (req, res) => {
  const articleId = parseInt(req.params.id);
  const articleIndex = articles.findIndex((a) => a.id === articleId);

  if (articleIndex === -1) {
    return res.status(404).json({ error: "Article not found" });
  }

  articles.splice(articleIndex, 1);
  res.json({ message: "Article deleted successfully" });
});

// Companies API
server.post("/api/companies/create", (req, res) => {
  const { name, status } = req.body;

  const newCompany = {
    id: companies.length + 1,
    logo,
    name,
    status,
  };

  companies.push(newCompany);

  res
    .status(201)
    .json({ message: "Company created successfully", company: newCompany });
});

server.get("/api/companies/all", (req, res) => {
  const companies = router.db.get("companies");
  res.json(companies);
});

server.put("/api/companies/edit", (req, res) => {
  const companyId = parseInt(req.params.id);
  const { name, status } = req.body;
  const companies = router.db.get("companies");
  const companyIndex = companies.findIndex((c) => c.id === companyId);

  if (companyIndex === -1) {
    return res.status(404).json({ error: "Company not found" });
  }

  // Update the company
  if (name) {
    companies[companyIndex].name = name;
  }

  if (status) {
    companies[companyIndex].status = status;
  }

  res.json({
    message: "Company updated successfully",
    company: companies[companyIndex],
  });
});

server.delete("/api/companies/delete", (req, res) => {
  const companyId = parseInt(req.params.id);
  const companyIndex = companies.findIndex((c) => c.id === companyId);
  const companies = router.db.get("companies");
  if (companyIndex === -1) {
    return res.status(404).json({ error: "Company not found" });
  }

  companies.splice(companyIndex, 1);
  res.json({ message: "Company deleted successfully" });
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
