const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET } = require('../middlewares/authMiddleware');



const UserController = {
    // registering new user 
    async register(req, res) {
        try {
            let user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
    })

    console.log(user);
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
}
catch(err){
    return res.status(500).send(err);
}
    },
    // Login
    async userLogin(req, res) {
    try {
        const { email, password } = req.body;
        console.log(req.body.email, req.body.password);
        const user = await User.findOne({ email: req.body.email })
        console.log('User found in database:', user);
        if (!user) {
            console.log('The user not found');
            return res.status(401).json('Wrong email');
        }
        console.log('Hashed password from database:', user.password);

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            return res.status(200).json({
                message: 'Login successful',
                user: user.email,
                token: token
            });
        } else {
            return res.status(401).json('Wrong password');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
},


    // Get user profile
    async getUserProfile(req, res) {
        try {
            console.log('User ID from token:', req.user.userId);
            const user = await User.findById(req.user.userId).select('-password');
            console.log('User found in database:', user);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Update user profile
    async updateUserProfile(req, res) {
        try {
            const { name, email } = req.body;
            console.log('Received name:', name);
            console.log('Received email:', email);

            const user = await User.findByIdAndUpdate(req.user.userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            let changesDetected = false;

            if (name && user.username !== name) {
                user.username = name;
                changesDetected = true;
            }

            if (email !== undefined && email !== '' && user.email !== email) {
                user.email = email;
                changesDetected = true;
            }

            if (changesDetected) {
                await user.save();
                console.log('User saved successfully');
                return res.status(200).json(user);
            } else {
                console.error('User update failed (no changes detected)');
                res.status(400).json({ msg: 'User update failed (no changes detected)' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Change password
    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            console.log('Received old password:', oldPassword);
            console.log('Received new password:', newPassword);
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid old password' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            return res.json({ msg: 'Password changed successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Logout
    async logout(req, res) {
        try {
            return res.json({ msg: 'Logged out successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
};

module.exports = UserController;
