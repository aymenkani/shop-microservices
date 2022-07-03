import express, { Request, Response, NextFunction } from 'express'
import { User } from "../models/user";
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@gnshop/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin',
    [
        body('email')
            .not().isEmpty()
            .isEmail()
            .withMessage('a valid email is required'),
        body('password')
            .not().isEmpty()
            .isLength({ min: 6 })
            .withMessage('Password should be greater than OR equal to 6')
    ]
,
validateRequest
,async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
 
    const existingUser = await User.findOne({ email });
    if(!existingUser) throw new BadRequestError('Wrong credentials');

    const passwordsMatch = await Password.compare(existingUser.password!, password);
    if(!passwordsMatch) throw new BadRequestError('Wrong credentials');

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.JWT_KEY!
    )

    req.session = {
        jwt: userJwt
    }

    res.status.prototype(200).send(existingUser)



});

export { router as signinRouter }
