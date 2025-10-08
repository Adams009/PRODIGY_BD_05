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

// Importing Validators and Validator Error Middleware
import  {validatorError}  from './middlewares/validatorError.js';
import registrationSchema  from './validators/registrationSchema.js';
import loginSchema from './validators/loginSchema.js';
import hotelRegistrationSchema from './validators/hotelRegistrationSchema.js';
import roomCreatingSchema from './validators/roomCreatingSchema.js';
import hotelUpdateSchema from './validators/updateHotelSchema.js';
import roomUpdateSchema from './validators/updateRoomSchema.js';
import idValidationSchema from './validators/idValidationSchema.js';
import deleteRoomSchema from './validators/deleteRoomSchema.js';

// Importing Routes
import registerRouter from './routes/register.js'
import loginRouter from './routes/login.js'
import refreshTokenRouter from './routes/refreshToken.js'
import csrfTokenRouter from './routes/csrfToken.js';
import profileRouter from './routes/profile.js';
import hotelRegistrationRouter from './routes/registerHotel.js'
import roomCreationRouter from './routes/createRoom.js'
import hotelUpdateRouter from './routes/updateHotel.js'
import roomUpdateRouter from './routes/updateRoom.js'
import deleteHotelRouter from './routes/deleteHotel.js'
import deleteRoomRouter from './routes/deleteRoom.js'

// Importing Middlewares
import csrfProtection from './middlewares/csrfProtection.js';
import atLeastOneHotelField from './middlewares/hotelUpdateAtLeastCheck.js';
import atLeastOneRoomField from './middlewares/roomUpdateAtLeastCheck.js';

// Defining Routes with Middlewares
app.use('/register', csrfProtection, registrationSchema, validatorError, registerRouter)
app.use('/login', csrfProtection, loginSchema, validatorError, loginRouter)
app.use('/refreshToken', csrfProtection, refreshTokenRouter)
app.use('/csrf-token', csrfTokenRouter)
app.use('/profile/me', profileRouter)
app.use('/hotels', csrfProtection, hotelRegistrationSchema, validatorError, hotelRegistrationRouter)
app.use('/rooms', csrfProtection, roomCreatingSchema, validatorError, roomCreationRouter)
app.use('/hotels',csrfProtection, hotelUpdateSchema, atLeastOneHotelField, validatorError, hotelUpdateRouter)
app.use('/rooms', csrfProtection, roomUpdateSchema, atLeastOneRoomField, validatorError, roomUpdateRouter)
app.use('/hotels', csrfProtection, idValidationSchema, validatorError, deleteHotelRouter)
app.use('/rooms', csrfProtection, deleteRoomSchema, validatorError, deleteRoomRouter)

const port = ENV.PORT

app.listen(port, () => {
    console.log(`Application Server listening to port ${port}`);
})
