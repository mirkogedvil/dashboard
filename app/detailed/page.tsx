"use client";
import CreatedStagesChart from "@/components/CreatedStagesChart";
import DatabaseSelect from "@/components/DatabaseSelect";
import ProjectTimelineChart from "@/components/ProjectTimelineChart";
import ReportingsChart from "@/components/ReportingsChart";
import { Button } from "@/components/ui/button";
import { getActiveProjectsCount } from "@/helpers/dataProcessing";
import { RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Detailed = () => {
  const [data, setData] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const [projects, setProjects] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [interval, setInterval] = useState("weekly");

  // Fetch data function

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/query?queryType=databases");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await (await response.json()).data;
      setData(result?.sort()); // Update state with the new data
      if (selectedDatabase) {
        const detailedResponse = await fetch(
          `/api/query?queryType=detailedData&db=${selectedDatabase}`
        );
        if (!detailedResponse.ok)
          throw new Error("Network response was not ok");
        const detailedResult = await (await detailedResponse.json()).data;
        setDetailedData(detailedResult);

        const procData = getActiveProjectsCount(
          detailedData.stagesForTimeline,
          interval
        );
        setProcessedData(procData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleDatabaseSelect = async (database) => {
    setSelectedDatabase(database);
    try {
      const response = await fetch(
        `/api/query?queryType=detailedData&db=${database}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await (await response.json()).data;
      setDetailedData(result);
      const procData = getActiveProjectsCount(
        result.stagesForTimeline,
        interval
      );
      setProcessedData(procData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    // Handle the selection change, e.g., fetch data based on selected database
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-bold">Detailsem</h1>
        <Button className="bg-ez_blue" onClick={fetchData}>
          <RefreshCwIcon></RefreshCwIcon>
          {loading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>
      <div className="flex items-center space-x-1 p-1 rounded-lg">
        <div className="w-1/4 max-w-72 min-w-48">
          <DatabaseSelect databases={data} onSelect={handleDatabaseSelect} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <CreatedStagesChart response={detailedData} />
        <ReportingsChart response={detailedData} />
      </div>
      <div className="grid gap-6 md:grid-cols-1">
        <ProjectTimelineChart data={processedData} interval={interval} />
      </div>
    </div>
  );
};

export default Detailed;
