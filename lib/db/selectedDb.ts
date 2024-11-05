// lib/db.js
import postgres from 'postgres';

const mainDb = postgres({
  host: process.env.DB_HOST,      // PostgreSQL host
  port: Number(process.env.DB_PORT),                // PostgreSQL port
  database: process.env.GENERAL_DATABASE,   // Name of the database
  username: process.env.DB_USER,  // Database username
  password: process.env.DB_PASSWORD,  // Database password
});

export async function getDbHost(db) {
  return await mainDb`
    SELECT 
    database,
    dbhost
    FROM databases
    WHERE database = ${db}
  `;
}

export async function getDbData(db,host) {
  let ret;
  const dbConnection = postgres({
    host: host,      // PostgreSQL host
    port: Number(process.env.DB_PORT),                // PostgreSQL port
    database: db,   // Name of the database
    username: process.env.DB_USER,  // Database username
    password: process.env.DB_PASSWORD,  // Database password
  });

  const createdStages = await dbConnection`
    SELECT 
        to_char((gs.day)::date,'DD.MM.YYYY') as day,
        COUNT(project_stages.created) AS count
    FROM 
        generate_series(
            CURRENT_DATE - INTERVAL '6 days',
            CURRENT_DATE,                     
            INTERVAL '1 day'                 
        ) AS gs(day)
    LEFT JOIN 
        project_stages ON DATE(project_stages.created) = gs.day
    GROUP BY 
        gs.day
    ORDER BY 
        gs.day;
  `;
  const stagesForTimeline = await dbConnection`
    SELECT 
    project_id,
    stage_code,
    name, 
    GREATEST(created,'2023-01-01')::DATE as start_time,
    due_date::DATE AS end_time 
    FROM project_stages 
    WHERE COALESCE(due_date,NOW()::DATE) >= NOW()::DATE - INTERVAL '350 days' AND due_date IS NOT NULL AND COALESCE(due_date,NOW()::DATE) <= CURRENT_DATE + INTERVAL '350 days';
  `;

  const reportings = await dbConnection`
    WITH reportings as (
      SELECT 
      operation_start,
      operation_end 
      FROM working_times 
      WHERE COALESCE(working_times.operation_end,working_times.operation_start)::DATE >= CURRENT_DATE - INTERVAL '6 days'
      UNION ALL 
      SELECT 
      operation_start,
      operation_end 
      FROM working_times_simplified_report 
      WHERE COALESCE(working_times_simplified_report.operation_end,working_times_simplified_report.operation_start)::DATE >= CURRENT_DATE - INTERVAL '6 days'
    )
    SELECT 
        to_char((gs.day)::date,'DD.MM.YYYY') as day,
        COUNT(COALESCE(reportings.operation_end,reportings.operation_start)) AS count
    FROM 
        generate_series(
            CURRENT_DATE - INTERVAL '6 days',
            CURRENT_DATE,                     
            INTERVAL '1 day'                 
        ) AS gs(day)
    LEFT JOIN 
        reportings ON DATE(COALESCE(reportings.operation_end,reportings.operation_start)) = gs.day
    GROUP BY 
        gs.day
    ORDER BY 
        gs.day;
  `;
  ret = {
    createdStages,
    reportings,
    stagesForTimeline
  }

  return ret;
}

export default mainDb;