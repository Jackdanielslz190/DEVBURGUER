import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(request, response, next) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split(' ').at(1);

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return response.status(401).json({ error: 'Token is invalid' });
        }
        
        request.userId = decoded.id;
        request: userName = decoded.userName
        
    });
}

export default authMiddleware;

