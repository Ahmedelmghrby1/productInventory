import authRouter from "./auth/auth.routes.js"
import productRouter from "./products/product.routes.js"


export const bootstrab= (app)=>{
   
    app.use('/api/auth',authRouter)
    app.use('/api/products',productRouter)







}


