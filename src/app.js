import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// routers import
import userRouters from "./routes/user.routes.js";


// routes declaration
app.use("/api/v1/users", userRouters)


app.use((err, req, res, next) => {
  console.error(err.stack)

  const status = err.statusCode || 500
  const response = {
    success: false,
    data: null,
    message: err.message || "Internal server error"
  }
  // if (process.env.NODE_ENV !== "production") {
  //   response.stack = err.stack
  // }
  res.status(status).json(response)
})

export default app