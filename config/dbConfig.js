import {Pool} from 'pg'
import ENV from './envConfig.js'


const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
    max: 10, // max connections in pool 
    idleTimeoutMillis: 30000, // close idle clients after 30s
    connectionTimeoutMillis: 2000, // return error if connection takes >2s
});

const connectDB = async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
    } catch (err) {
        console.error("❌ Database connection error", err.stack);
        process.exit(1);
    }
}


export { pool, connectDB };