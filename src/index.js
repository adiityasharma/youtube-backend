import "dotenv/config"
import { connectDB } from "./db/index.js"
import app from "./app.js"

const PORT = process.env.PORT ?? 5000

connectDB()

app.listen(PORT, () => {
  console.log(`server started ${PORT}`)
})