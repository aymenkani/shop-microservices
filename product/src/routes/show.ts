import { NotFoundError, requireAuth } from '@gnshop/common';
import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/:productId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate('image');

    if(!product) {
        throw new NotFoundError();
    }

    res.status(200).send(product)

})
