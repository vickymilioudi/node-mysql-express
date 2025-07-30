import express from "express";
import studentRoutes from "./routes/student.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MySQL + Node.js + Express app." });
});

app.use("/students", studentRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});