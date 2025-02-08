import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const schema = new Schema({ 
    name: String,
    email: { type: String, unique: true },
    password: String, 
    isBlocked:{
        type: Boolean,
        default: false
    },
    role: { type: String, enum: ["admin", "user"], default: "user" }
})
schema.pre('save',function() {
    this.password = bcrypt.hashSync(this.password, 8);
    
})

schema.pre('findOneAndUpdate',function() {
  if( this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
    
})
export const User= model('User', schema);  