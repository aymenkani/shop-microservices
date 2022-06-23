import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface ImageAttrs {
    name: string;
    img: {
        data: Buffer,
        contentType: string
    },
    src?: string
}

interface ImageDoc extends mongoose.Document {
    name: string;
    img: {
        data: Buffer,
        contentType: string
    },
    src?: string,
}

interface ImageModel extends mongoose.Model<ImageDoc> {
    build(attrs: ImageAttrs): ImageDoc
}


const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    img: {
        data: Buffer,
        contentType: String
    },
    src: {
        type: String,
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

imageSchema.set('versionKey', "version");
imageSchema.plugin(updateIfCurrentPlugin)

imageSchema.pre('save', async function(done) {
    this.set('src',
     `data:image/${this.get('img').contentType};base64,${this.get('img').data.toString('base64')}`
    );
    
    done()
})

imageSchema.statics.build = (attrs: ImageAttrs) => {
    return new Image(attrs);
}

const Image = mongoose.model<ImageDoc, ImageModel>('Image', imageSchema);

export { Image }
