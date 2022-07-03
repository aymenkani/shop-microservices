import express, { Response, Request } from 'express';
import { uploadImage } from '../helpers/upload-img-handler';
import { Image } from '../models/image';
import { Product, ProductAttrs } from '../models/product';
import fs from 'fs'
import path from 'path'
import { uploadDir } from '../constants/'
import { body } from 'express-validator';
import { validateRequest, BadRequestError, requireAuth } from '@gnshop/common';
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
import { natsWrapper } from '../nats-wrapper'

const router = express.Router();


router.post("/api/products",
    requireAuth, 
    [
        body('title')
        .not()
        .isEmpty()
        .withMessage('title is required'),
    ],
    validateRequest
, uploadImage.single('image'), async (req: Request, res: Response) => {
    
    if(!req.file) {
        throw new BadRequestError('An image must be provided!')
    }

    const { title, price, description, quantity } = req.body as ProductAttrs;


    // create image
    const image = await Image.build({
        name: title,
        img: {
          data: fs.readFileSync(path.join(__dirname + uploadDir + req.file!.filename)),  
          contentType: 'image/png'
        }
    });

    await image.save();

    // delete image from local storage
    fs.rmSync(path.join(__dirname + uploadDir + req.file!.filename))

    // save product
    const product = await Product.build({
        title,
        price,
        description,
        image: image.id,
        quantity,
        userId: req.currentUser!.id
    });

    await product.save()

    new ProductCreatedPublisher(natsWrapper.client).publish({
        title: product.title,
        id: product.id,
        quantity: product.quantity,
        price: product.price,
        userId: product.userId,
    })

    res.status(201).send(product)

})

export { router as newProductRouter };
