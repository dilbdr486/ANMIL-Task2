import express from "express"
import cors from "cors"
import userRoute from "./routes/userRoute.js"

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })

app.use("/api/user",userRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})