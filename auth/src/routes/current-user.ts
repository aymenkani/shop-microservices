import { currentUser } from '@gnshop/common';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/api/users/current-user', currentUser ,async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }
