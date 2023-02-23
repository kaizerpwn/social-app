import { db } from "../db.js";
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";

export const getComments = (req, res) => {

    const getCommentsQuery = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(getCommentsQuery, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const insertNewPost = "INSERT INTO comments (`description`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            req.body.description,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]

        db.query(insertNewPost, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Comment has been added');
        })
    })

}