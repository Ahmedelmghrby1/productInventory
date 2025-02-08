import { model, Schema } from "mongoose";


const schema = new Schema({ 
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true, min: 50 , max: 200 },
    quantity: { type: Number, required: true, min: 0 },
},
  { timestamps: true }
)

export const Product = model ('Product', schema)