import { User } from "../entities/User.js";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { JWT_SECRET, SALT_ARAUND, JWT_EXPIRATION } from "../../../../config/Config.js";



export const registerUser = async (firstName, lastName, email, password) => {

    const passwordhash = await argon2.hash(password, { salt: SALT_ARAUND });
    return User.create({
        firstName,
        lastName,
        email,
        passwordHash: passwordhash,
    });
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User not found in the database");
        error.status = 404;
        throw error;
    };

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (!ispasswordValid) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;
    };

    const token = jwt.sing({ 
        userId: user.id, 
        email: user.email }, 
        JWT_SECRET, { 
            expiresIn: 
            JWT_EXPIRATION 
        });

    return { token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } };
};
    const verifyToken = (token) => {
        return jwt.verify(token, JWT_SECRET);
    };
