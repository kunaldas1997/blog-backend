import expressAsyncHandler from "express-async-handler";
import { Author } from "../models/postModel.js";
import { CompareJWT } from "../middleware/tokenVerifier.js";
import bcrypt from 'bcrypt';
import { GenerateJWT } from "../config/jwtgen.js";

export const createUser = expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, nickname, password, rights } = req.body;
        const userExists = await Author.findOne({ email });
        if (userExists) {
            return res.json({
                message: "User Exists"
            });
        }
        const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10));

        const user = await Author.create({
            name, email, nickname, password: hashPass, rights
        });

        if (user) {
            const token = GenerateJWT(user.id);
            res.setHeader("Authorization", "Bearer " + token);
            res.cookie("auth", "Bearer " + token);
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                nickname: user.nickname,
                rights: user.rights,
                token: token
            });
        } else {
            res.status(400);
            throw Error("Invalid Data");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }


});
export const getUser = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        let token = req.headers.authorization;
        if (token) {
            const data = await CompareJWT(token.split(" ")[1]);
            const user = await Author.findById(data).populate({ select: "-password " });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: "Please Check your data" });
            }
            res.json({ token });
        }

        else {
            const user = await Author.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            token = GenerateJWT(user._id);

            res.json({token });
        }



    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export const updateeUser = expressAsyncHandler(async (req, res) => { });
export const deleteUser = expressAsyncHandler(async (req, res) => { }); 