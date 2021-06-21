import express from "express";
const PORT = 3000;

const app = express();

app.get("/test", (req, res) => {
  return res.send("Hello World");
});

app.post("/test-post", (req, res) => {
  return res.send("Test method POST");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
