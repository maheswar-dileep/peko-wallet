import jwt from 'jsonwebtoken';
export const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!Array.isArray(authHeader) && !authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = Array.isArray(authHeader) ? authHeader[0]?.split(' ')[1] : authHeader?.split(' ')[1];
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ error: err });
        }
        req.userId = decoded?.Userinfo?.id;
        req.userEmail = decoded.Userinfo?.email;
        next();
    });
};
//# sourceMappingURL=verifyJwt.js.map