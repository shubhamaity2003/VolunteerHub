const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");
const contactRoutes = require("./routes/contactRoutes");


const connectDB = require("./config/db");

dotenv.config();

console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("JWT_SECRET value:", process.env.JWT_SECRET);

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/api/upload", uploadRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/contact", contactRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "VolunteerHub API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});









