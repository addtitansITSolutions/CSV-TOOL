const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToMongo = require("./db/db");
const uploadRoutes = require("./routes/uploadRoutes");
const processRoutes = require("./routes/processRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// Trust only the local Nginx reverse proxy
app.set("trust proxy", "loopback");


connectToMongo();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.json({
    message: "Affiliate CSV Tool API is running!",
  });
});




app.use("/api/auth" , authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/process", processRoutes);
app.use("/api/history" , historyRoutes);
app.use("/api/download" , downloadRoutes);

module.exports = app;