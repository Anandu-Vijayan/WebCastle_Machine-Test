const jwt = require('jsonwebtoken');
const User = require('../models/userDeatils'); // Ensure your model path is correct
const dotenv = require('dotenv');
dotenv.config();

exports.adminProtect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.id);

        // if (!user) {
        //     return res.status(401).json({ success: false, error: 'User not found' });
        // }

        // if (user.role !== 'admin') {
        //     return res.status(403).json({ success: false, error: 'Unauthorized, admin access required' });
        // }

        // req.user = user;
        next();
    } catch (error) {
        console.error('Error in adminProtect middleware:', error.message);
        return res.status(401).json({ success: false, error: 'Not authorized' });
    }
};
