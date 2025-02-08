import jwt from "jsonwebtoken"

export const verifyToken = async(req, res, next) => {
    let{token}=req.headers
    jwt.verify(token,'myNameIsAhmed',async(err,decodeed)=>{
        if(err) return res.status(401).json({message:"invalid token",err})

           else req.user=decodeed
        next() 

    })
}