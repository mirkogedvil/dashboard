import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import React from "react";

const OverviewCard = ({ title, mainValue, footer, icon, tooltip }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-white rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mainValue}</div>
            <p className="text-xs text-muted-foreground">{footer}</p>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="bg-ez_blue">{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default OverviewCard;
