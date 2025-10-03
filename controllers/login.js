import prisma from "../prisma/prismaConnect.js";
import argon2 from "argon2";
import {signJwt} from "../utils/jwtSignAndVerify.js";
import ENV from "../config/envConfig.js";
const loginController = async (req, res) => {
     const {email, password} = req.body

    try {
            const checkUser = await prisma.user.findFirst({
            where : {
                email : email
            }
        })

        if (!checkUser) {
            return res.status(401).json({"error" : "invalid credential"})
        }

        const checkPassword = await argon2.verify(checkUser.password, password)

        if (!checkPassword) {
            return res.status(401).json({"error" : "invalid credential"})
        }

        const {password : pw, ...userResponse} = checkUser

        const payload = {
            id : checkUser.id,
            role : checkUser.role
        }

        const token = await signJwt(payload, {exp : '15m'})
        const refreshToken = await signJwt(payload, { exp : '7d', notBefore: '15m'})

        res.cookie('refreshToken', refreshToken, {
            httpOnly : false,
            secure : ENV.NODE_ENV === 'production',
            sameSite : 'Lax',
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(200).json({
            status : "success",
            data : {
                token,
                user : userResponse
            }
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status : "failed",
            error : "Internal serval error"
        })       
    }
}

export default loginController