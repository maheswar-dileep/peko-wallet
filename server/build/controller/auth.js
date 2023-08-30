import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';
import validateSignup from '../helpers/validations/signup.js';
import validateSignin from '../helpers/validations/signin.js';
import { OTPModel } from '../model/otp.js';
//*--- signup ---*//
export const signup = async (req, res) => {
    try {
        const { error, value } = validateSignup(req.body);
        if (error)
            return res.status(422).send(error.details[0]?.message);
        const userExists = await User.findOne({ email: value?.email });
        if (userExists)
            return res.status(405).send({ success: false, message: 'user already exists' });
        function generateUnique6Digit() {
            const fullUuid = uuidv4();
            const unique6Digit = fullUuid.substr(0, 6);
            return unique6Digit;
        }
        const uniqueId = generateUnique6Digit();
        const hash = await bcrypt.hash(value?.password, 10);
        const newUser = new User({
            username: value?.username,
            email: value?.email,
            password: hash,
            uniqueId,
        });
        await newUser.save();
        return res.status(201).send({ success: true, message: 'user created Successfully' });
    }
    catch (error) {
        return res.status(500).send({ success: false, err: error });
    }
};
//*--- sign in ---*//
export const signin = async (req, res) => {
    const accessTokenSecret = process.env.ACCESSTOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET;
    if (!accessTokenSecret)
        throw new Error('Access token secret is not defined.');
    if (!refreshTokenSecret)
        throw new Error('refresh token secret is not defined.');
    try {
        const { error, value } = validateSignin(req.body);
        if (error)
            return res.status(422).send({ err: error?.details[0]?.message });
        const user = await User.findOne({ email: value?.email });
        if (!user)
            return res.status(404).send({ error: 'not found' });
        const match = await bcrypt.compare(value?.password, user?.password);
        if (!match)
            return res.status(406).send({ err: 'invalid email or password' });
        const accessToken = jwt.sign({
            Userinfo: {
                id: user?._id,
                email: user?.email,
            },
        }, accessTokenSecret, {
            expiresIn: '15min',
        });
        const refreshToken = jwt.sign({
            id: user?._id,
            email: user?.email,
        }, refreshTokenSecret, { expiresIn: '7d' });
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.send({ accessToken, user: user, success: true });
    }
    catch (error) {
        res.status(500).send({ err: error });
    }
};
//refresh token
export const refresh = async (req, res) => {
    try {
        const accessTokenSecret = process.env.ACCESSTOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET;
        if (!accessTokenSecret)
            throw new Error('Access token secret is not defined.');
        if (!refreshTokenSecret)
            throw new Error('refresh token secret is not defined.');
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.status(401).send({ message: 'Unauthorized' });
        const refreshToken = cookies.jwt;
        const data = jwt.verify(refreshToken, refreshTokenSecret);
        if (typeof data === 'string')
            return res.status(403).send({ error: 'Forbidden' });
        const user = await User.findOne({ _id: data?.id });
        if (!user)
            return res.status(401).send({ message: 'Unauthorized' });
        const accessToken = jwt.sign({
            Userinfo: {
                id: user._id,
                email: user.email,
            },
        }, accessTokenSecret, { expiresIn: '15min' });
        return res.send({ accessToken });
    }
    catch (error) {
        res.status(500).send({ err: error });
    }
};
//signout
export const signout = (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.status(204).send({ err: "can't clear cookie" });
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).send({ message: 'Cookie cleared and logout successfull' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ err: error });
    }
};
export const getOTP = async (req, res) => {
    const userExists = await User.findOne({ email: req.body?.email });
    if (!userExists)
        return res.status(405).send({ success: false, message: 'user does not exist' });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    const sendOTPEmail = (recipient, otpCode) => {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: recipient,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otpCode}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending OTP email:', error);
            }
            else {
                console.log('OTP email sent:', info.response);
            }
        });
    };
    function generateUnique6Digit() {
        const fullUuid = uuidv4();
        const sixDigits = fullUuid.replace(/[^0-9]/g, '').substr(0, 6);
        return sixDigits;
    }
    const userEmailAddress = req.body?.email;
    const otpCode = generateUnique6Digit();
    const newOTP = new OTPModel({
        code: otpCode,
        email: userEmailAddress,
    });
    newOTP.save();
    sendOTPEmail(userEmailAddress, otpCode);
    return res.status(200).send({ success: true, message: 'Email send Successfully' });
};
export const validateOTP = async (req, res) => {
    try {
        const verifyOTP = await OTPModel.findOne({ email: req.body.email });
        if (!verifyOTP) {
            return res.status(400).send({ success: false, message: 'OTP not found for the given email' });
        }
        if (verifyOTP.code === req.body?.code) {
            await OTPModel.deleteOne({ email: req.body.email });
            return res.status(200).send({ success: true, message: 'Email verified successfully' });
        }
        else {
            return res.status(400).send({ success: false, message: 'Email verification failed' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
};
//# sourceMappingURL=auth.js.map