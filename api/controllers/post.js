import { db } from "../db.js";
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {

    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const getPostsQuery =
            userId !== "undefined"
                ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
                : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
                LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
                ORDER BY p.createdAt DESC`;

        const values =
            userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        db.query(getPostsQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

}