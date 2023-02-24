
import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getRelationships = (req, res) => {

    const getLikesQuery = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

    db.query(getLikesQuery, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    })
}

export const addRelationship = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const relationshipsQuery = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId
        ]

        db.query(relationshipsQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Following');
        })
    })
}

export const deleteRelationship = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not logged in!');

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const relationshipsQuery = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        db.query(relationshipsQuery, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Unfollowed');
        })
    })
}