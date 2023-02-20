import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

// >> Routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"


// >> Middlewares
app.use(express.json())
// app.use(cors())
app.use(cookieParser)


// >> API
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)


app.listen(8800, () => {
    console.log('API Running')
})