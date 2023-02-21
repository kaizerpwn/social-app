import { db } from "../db.js";

export const getPosts = (req, res) => {
    const getPostsQuery = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)`

    db.query(getPostsQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}