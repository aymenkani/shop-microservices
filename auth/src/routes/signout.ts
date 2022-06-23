import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/api/current-user' ,async (req: Request, res: Response, next: NextFunction) => {
    req.session = null

    res.send({})
});

export { router as signoutRouter }
