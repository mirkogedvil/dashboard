import { NextRequest, NextResponse } from 'next/server';
import { starterData,projectClientsData,totalActionsWeekly,totalActions, topFiveActions, mostActiveUsersByDatabase} from "@/lib/db/db";
import { getDbData, getDbHost } from '@/lib/db/selectedDb';


export async function GET(req: NextRequest) {
  try {
    const queryType = req.nextUrl.searchParams.get('queryType');
    let result;

    if(queryType == 'startData'){
        const starterClients = await starterData();
        const projectsClients = await projectClientsData();

        const combinedDatabases = [
            ...starterClients.map((x: any) => x.database),
            ...projectsClients.map((x: any) => x.database),
          ];

        result = {
            starterData : await starterData(),
            projectClientsData : await projectClientsData(),
            totalActions : await totalActions(combinedDatabases),
            totalActionsWeekly : await totalActionsWeekly(combinedDatabases),
            topFiveActions : await topFiveActions(combinedDatabases),
            mostActiveUsersByDatabase : await mostActiveUsersByDatabase(combinedDatabases),

        }   
    }
    else if(queryType == "databases"){
      const starterClients = await starterData();
      const projectsClients = await projectClientsData();

      const combinedDatabases = [
        ...starterClients.map((x: any) => x.database),
        ...projectsClients.map((x: any) => x.database),
      ];
      result = combinedDatabases;
    }
    else if(queryType == "detailedData"){
      const database = req.nextUrl.searchParams.get('db');
      const dbData = (await getDbHost(database))[0];
      const dbStats = await getDbData(database,dbData.dbhost);
      result = dbStats;
    }
    else{
        result = [];
    }
    return new Response(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    console.error('Database query failed:', error);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}