// lib/db.js
import postgres from 'postgres';


const userActionsDb = () => {
  return postgres({
    host: process.env.DB_USAGE_METRICS,      // PostgreSQL host
    port: Number(process.env.DB_PORT),                // PostgreSQL port
    database: "usage_metrics",   // Name of the database
    username: process.env.DB_USER,  // Database username
    password: process.env.DB_PASSWORD,  // Database password
  });
};

export default userActionsDb;