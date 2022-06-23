import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface ProductAttrs {
    title: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    userId: string
}

interface ProductDoc extends mongoose.Document {
    title: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    userId: string;
    version: string;
    reserved?: number
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): Promise<ProductDoc>
}


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    },

    reserved: {
        type: Number,
        default: 0
    },

    userId: {
        type: String,
        required: true
    }

},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = doc._id
                delete doc._id
            }
        }
    }
);

productSchema.set('versionKey', "version");
productSchema.plugin(updateIfCurrentPlugin)

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product }
