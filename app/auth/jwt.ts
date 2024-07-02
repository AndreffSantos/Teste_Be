import jwt from 'jsonwebtoken'

interface Ipayload {
    email: string
}

const JWT_SECRETE = process.env.JWT_SECRETE || 'super-secrete'
 
const JWT_OPTIONS = {
    algorithm: 'HS256',
    expiresIn: '1d',
};

export default class Auth {
    static createToken(payload: Ipayload) {
        return jwt.sign(payload, JWT_SECRETE, JWT_OPTIONS as jwt.SignOptions)
    }

    static validateToken(token: string) {
        return jwt.verify(token, JWT_SECRETE, JWT_OPTIONS as jwt.SignOptions)
    }
}
