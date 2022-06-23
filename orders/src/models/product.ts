import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

interface ProductAttrs {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  quantity: number;
  version: number;
  reserved: number;
  isReserved(): Promise<boolean>;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<ProductDoc | null>;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
        type: Number,
        required: true
    },
    reserved: {
        type: Number,
        default: 0
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Product.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};
productSchema.methods.isReserved = async function (orderedQuantity: number) {
  // this === the product document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    product: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  const isAvailable = this.quantity - (this.reserved + orderedQuantity) > 0

  return (!!existingOrder) && isAvailable
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
