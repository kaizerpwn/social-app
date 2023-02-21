import { db } from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');
        const getPostsQuery = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`;

        db.query(getPostsQuery, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

}
export const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const insertNewPost = "INSERT INTO posts (`description`, `img`, `createdAt`, `userId`) VALUES (?)";
        const values = [
            req.body.description,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]

        db.query(insertNewPost, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Post has been added');
        })
    })

}