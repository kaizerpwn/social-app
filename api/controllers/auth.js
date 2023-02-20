import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    //>> Check if user exists
    const checkUserExists = "SELECT * FROM users WHERE username = ?";

    db.query(checkUserExists, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json('Korisnik sa takvim korisničkim imenom već postoji!')

        //>> Create new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertNewUser = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES(?)";
        const valuesToImport = [req.body.username, req.body.email, hashedPassword, req.body.name];

        db.query(insertNewUser, [valuesToImport], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json('Uspješna registracija')
        });
    });

}


export const login = (req, res) => {
    const checkUserExists = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserExists, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Korisnik nije pronađen.");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if (!checkPassword) return res.status(400).json("Korisničko ime ili unesena lozinka nisu validni.");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...other } = data[0]; // razdvajamo podatke od korisnika, password ne ide zajedno sa ostalim podacima u other varijabli

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other)
    });
}


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("Korisnik je odjavljen")
}