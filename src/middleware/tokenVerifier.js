import jwt from 'jsonwebtoken';
import config from '../config/config.json' with {type: "json"};

export const CompareJWT = async (token) => {
    if (token) {

        const decoded = jwt.verify(token, config.configuration.jwt_token);

        return decoded.id;
    }
}