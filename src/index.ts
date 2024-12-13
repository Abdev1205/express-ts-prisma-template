import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import prisma from "./config/database.js";
const app: Application = express();
const PORT = process.env.PORT || 4000;

// * Middleware
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
