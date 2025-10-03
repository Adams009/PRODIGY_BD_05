import dotenv from 'dotenv'
dotenv.config()

const ENV = {
    PORT : process.env.PORT,
    DATABASE_URL : process.env.POSTGRES_URL ,
    JWT_SECRET : process.env.JWT_SECRET,
    PRIVATE_KEY : process.env.PRIVATE_KEY_PATH,
    PUBLIC_KEY : process.env.PUBLIC_KEY_PATH,
    NODE_ENV : process.env.NODE_ENV
}

export default ENV