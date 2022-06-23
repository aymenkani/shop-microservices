import mongoose from "mongoose";
import { Password } from "../services/password";

export interface UserAttrs {
    email: string,
    password: string
}

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string 
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): Promise<UserDoc>
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = doc._id
                delete doc._id
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }
