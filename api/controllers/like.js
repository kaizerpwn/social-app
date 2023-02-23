
import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getLikes = (req, res) => {

    const getLikesQuery = "SELECT userId FROM likes WHERE postId = ?";

    db.query(getLikesQuery, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    })
}

export const addLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const addNewLikeQuery = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.postId
        ]

        db.query(addNewLikeQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Like has been added');
        })
    })
}

export const deleteLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const addNewLikeQuery = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(addNewLikeQuery, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Like has been deleted');
        })
    })
}