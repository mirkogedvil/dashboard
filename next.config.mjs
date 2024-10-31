/** @type {import('next').NextConfig} */

import path from 'path';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(os.homedir(), ".env") });


const nextConfig = {
    env:{
        DB_HOST: process.env.DB_HOST,      // PostgreSQL host
        DB_PORT: process.env.DB_PORT,                // PostgreSQL port
        GENERAL_DATABASE: process.env.GENERAL_DATABASE,   // Name of the database
        DB_USER: process.env.DB_USER,  // Database username
        DB_PASSWORD: process.env.DB_PASSWORD, 
    }
};

export default nextConfig;
