import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import ENV from './config/envConfig.js'
import { connectDB } from './config/dbConfig.js'


const app = express()
connectDB()

app.use(helmet())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
}))

import  {validatorError}  from './middlewares/validatorError.js';
import registrationSchema  from './validators/registrationSchema.js';
import loginSchema from './validators/loginSchema.js';

import registerRouter from './routes/register.js'
import loginRouter from './routes/login.js'



app.use('/register', registrationSchema, validatorError, registerRouter)
app.use('/login', loginSchema, validatorError, loginRouter)

const port = ENV.PORT

app.listen(port, () => {
    console.log(`Application Server listening to port ${port}`);
})
