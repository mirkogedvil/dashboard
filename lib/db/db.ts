// lib/db.js
import postgres from 'postgres';

const mainDb = postgres({
    host: process.env.DB_HOST,      // PostgreSQL host
    port: Number(process.env.DB_PORT),                // PostgreSQL port
    database: process.env.GENERAL_DATABASE,   // Name of the database
    username: process.env.DB_USER,  // Database username
    password: process.env.DB_PASSWORD,  // Database password
});

const userActionsDb = postgres({
    host: process.env.DB_USAGE_METRICS,      // PostgreSQL host
    port: Number(process.env.DB_PORT),                // PostgreSQL port
    database: "usage_metrics",   // Name of the database
    username: process.env.DB_USER,  // Database username
    password: process.env.DB_PASSWORD,  // Database password
});

export async function starterData() {
  return await mainDb`
    SELECT 
    database,
    dbhost
    FROM databases
    WHERE license_type = 't1' AND COALESCE(mrr,0) > 0
  `;
}
export async function projectClientsData() {
    return await mainDb`
      SELECT 
      database,
      dbhost
      FROM databases
      WHERE license_type IS NULL AND COALESCE(mrr,0) > 0 AND product = 'project'
    `;
}

export async function totalActions(combinedDatabases:any) {
  return await userActionsDb`
    SELECT 
    count(*) as actions,
    SUM(COUNT(*)) OVER() overal_total,
    database
    FROM user_actions u
    LEFT JOIN eziilians e ON e.username = u."user"
    WHERE 
    created::date = now()::date AND 
    e.username IS NULL AND u."user" IS NOT NULL AND
    database = ANY(string_to_array(${combinedDatabases.join(",")},','))
    GROUP BY database
    ORDER BY 1 desc
`;
}
export async function totalActionsWeekly(combinedDatabases:any) {
  return await userActionsDb`
  SELECT 
  count(*) as actions,
  SUM(COUNT(*)) OVER() overal_total,
  database
  FROM user_actions u
  LEFT JOIN eziilians e ON e.username = u."user"
  WHERE 
  created::date >= now()::date-7 AND 
  e.username IS NULL AND u."user" IS NOT NULL AND
  database = ANY(string_to_array(${combinedDatabases.join(",")},','))
  GROUP BY database
  ORDER BY 1 desc
`;
}
export async function topFiveActions(combinedDatabases:any) {
  return await userActionsDb`
   SELECT 
    u."user",
    u.database,
    count(*)
   FROM user_actions u
     LEFT JOIN eziilians e ON e.username = u."user"
  WHERE u.created::date = CURRENT_DATE AND e.username IS NULL AND u."user" IS NOT NULL AND
  database = ANY(string_to_array(${combinedDatabases.join(",")},','))
  GROUP BY 1,2
    ORDER BY 3 desc
  LIMIT 10;
`;
}

export async function mostActiveUsersByDatabase(combinedDatabases:any) {
  return await userActionsDb`
   SELECT 
    count(distinct u."user") as count,
    string_agg(distinct u.user,',') as users,
    u.database
   FROM user_actions u
     LEFT JOIN eziilians e ON e.username = u."user"
  WHERE u.created::date = CURRENT_DATE AND e.username IS NULL AND u."user" IS NOT NULL AND 
  database = ANY(string_to_array(${combinedDatabases.join(",")},','))
  GROUP BY 3
  ORDER BY 1 desc
  LIMIT 10;
`;
}
