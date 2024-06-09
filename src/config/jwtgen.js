import jwt from 'jsonwebtoken';
import config from './config.json' with {type: "json"};

export const GenerateJWT = (id) => {
    try {
        return jwt.sign({ id }, config.configuration.jwt_token, { expiresIn: "15d" });

    } catch (err) {
        console.log(err);
    }
}
