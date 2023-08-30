import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../model/user.js';
import validateSignup from '../helpers/validations/signup.js';
import validateSignin from '../helpers/validations/signin.js';

//*--- signup ---*//

export const signup = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateSignup(req.body);
    if (error) return res.status(422).send(error.details[0]?.message);

    const userExists = await User.findOne({ email: value?.email });
    if (userExists) return res.status(405).send({ success: false, message: 'user already exists' });

    function generateUnique6Digit() {
      const fullUuid = uuidv4();
      const unique6Digit = fullUuid.substr(0, 6);
      return unique6Digit;
    }

    const uniqueId = generateUnique6Digit();

    const hash: string = await bcrypt.hash(value?.password, 10);
    const newUser = new User({
      username: value?.username,
      email: value?.email,
      password: hash,
      uniqueId,
    });

    await newUser.save();
    return res.status(201).send({ success: true, message: 'user created Successfully' });
  } catch (error) {
    return res.status(500).send({ success: false, err: error });
  }
};

//*--- sign in ---*//

export const signin = async (req: Request, res: Response) => {
  const accessTokenSecret: string | undefined = process.env.ACCESSTOKEN_SECRET;
  const refreshTokenSecret: string | undefined = process.env.REFRESHTOKEN_SECRET;

  if (!accessTokenSecret) throw new Error('Access token secret is not defined.');

  if (!refreshTokenSecret) throw new Error('refresh token secret is not defined.');

  try {
    const { error, value } = validateSignin(req.body);

    if (error) return res.status(422).send({ err: error?.details[0]?.message });

    const user = await User.findOne({ email: value?.email });

    if (!user) return res.status(404).send({ error: 'not found' });

    const match = await bcrypt.compare(value?.password, user?.password);

    if (!match) return res.status(406).send({ err: 'invalid email or password' });

    const accessToken = jwt.sign(
      {
        Userinfo: {
          id: user?._id,
          email: user?.email,
        },
      },
      accessTokenSecret,
      {
        expiresIn: '15min',
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user?._id,
        email: user?.email,
      },
      refreshTokenSecret,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken, success: true });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

//refresh token
export const refresh = async (req: Request, res: Response) => {
  try {
    const accessTokenSecret: string | undefined = process.env.ACCESSTOKEN_SECRET;
    const refreshTokenSecret: string | undefined = process.env.REFRESHTOKEN_SECRET;

    if (!accessTokenSecret) throw new Error('Access token secret is not defined.');
    if (!refreshTokenSecret) throw new Error('refresh token secret is not defined.');

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send({ message: 'Unauthorized' });

    const refreshToken: string = cookies.jwt;
    const data = jwt.verify(refreshToken, refreshTokenSecret) as string | JwtPayload;

    if (typeof data === 'string') return res.status(403).send({ error: 'Forbidden' });

    const user = await User.findOne({ _id: data?.id });

    if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
      {
        Userinfo: {
          id: user._id,
          email: user.email,
        },
      },
      accessTokenSecret,
      { expiresIn: '15min' }
    );

    return res.send({ accessToken });
  } catch (error) {
    res.status(500).send({ err: error });
  }
};

//signout
export const signout = (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).send({ err: "can't clear cookie" });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).send({ message: 'Cookie cleared and logout successfull' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
};
