import { ActivityIcon, FactoryIcon, PlayIcon } from "lucide-react";
import React from "react";
import OverviewCard from "./OverviewCard";

const OverviewCards = ({ response }) => {
  const starterList = (
    <ul className="list-disc list-inside text-sm">
      {response.starterData?.map((x, i) => (
        <li key={i}>{x.database}</li>
      ))}
    </ul>
  );
  const projectsList = (
    <ul className="list-disc list-inside text-sm">
      {response.projectClientsData?.map((x, i) => (
        <li key={i}>{x.database}</li>
      ))}
    </ul>
  );

  const totalActionsTooltip = (
    <ul className="list-disc list-inside text-sm">
      {response.totalActions?.map((x, i) => (
        <li key={i}>
          {x.database} : {x.actions}
        </li>
      ))}
    </ul>
  );

  const totalActionsWeelyTooltip = (
    <ul className="list-disc list-inside text-sm">
      {response.totalActionsWeekly?.map((x, i) => (
        <li key={i}>
          {x.database} : {x.actions}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title="Starter clients"
        mainValue={response.starterData?.length || 0}
        footer=""
        icon={<PlayIcon className="h-4 w-4 text-muted-foreground" />}
        tooltip={starterList}
      />
      <OverviewCard
        title="Project clients"
        mainValue={response.projectClientsData?.length || 0}
        footer=""
        icon={<FactoryIcon className="h-4 w-4 text-muted-foreground" />}
        tooltip={projectsList}
      />
      <OverviewCard
        title="Today total actions"
        mainValue={
          response.totalActions?.length
            ? response.totalActions[0].overal_total
            : 0
        }
        footer=""
        icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
        tooltip={totalActionsTooltip}
      />
      <OverviewCard
        title="Last 7 days total actions"
        mainValue={
          response.totalActionsWeekly?.length
            ? response.totalActionsWeekly[0].overal_total
            : 0
        }
        footer=""
        icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
        tooltip={totalActionsWeelyTooltip}
      />
    </div>
  );
};

export default OverviewCards;
