import { NotFoundError, requireAuth, BadRequestError, validateRequest, NotAuthorizedError } from '@gnshop/common';
import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { Image } from '../models/image';
import { uploadImage } from '../helpers/upload-img-handler';
import { body } from 'express-validator';
import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper'


import fs from 'fs'
import path from 'path'
import { uploadDir } from '../constants/'

const router = express.Router()

router.post('/api/products/update/:id', 
requireAuth,
    [
        body('title')
            .not().isEmpty()
            .withMessage('You cannot sell a product without a name!'),
        body('quantity')
            .not().isEmpty()
            .isInt()
            .withMessage('A valid quantity must be provided')
    ],
    validateRequest
, uploadImage.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    
    const product = await Product.findById(req.params.id);

    if(!product) throw new NotFoundError();

    if(product.userId !== req.currentUser!.id) throw new NotAuthorizedError()

    const { title, price, description, quantity } = req.body;

    let imageId = product.image

    if(req.file) {
        const image = await Image.build({
            name: title,
            img: {
              data: fs.readFileSync(path.join(__dirname + uploadDir + req.file!.filename)),  
              contentType: 'image/png'
            }
        });
    
        await image.save();

        imageId = image.id
    }

    product.set({
        title, price, description, image: imageId, quantity
    })

    await product.save()

    new ProductUpdatedPublisher(natsWrapper.client).publish({
        title: product.title,
        id: product.id,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId,        
        reserved: product.reserved || 0,
    })

    res.status(200).send(product)

})

export { router as updateProductRouter }
