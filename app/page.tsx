"use client";
import OverviewCards from "@/components/core/dashboard/OverviewCards";
import MostUsersActionsChart from "@/components/MostUsersActionsChart";
import TopUserActionsChart from "@/components/TopUserActionsChart";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Overview() {
  const [data, setData] = useState([]); // State to hold card data
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/query?queryType=startData");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await (await response.json()).data;
      setData(result); // Update state with the new data
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-bold">Ülevaade</h1>
        <Button className="bg-ez_blue" onClick={fetchData}>
          <RefreshCwIcon></RefreshCwIcon>
          {loading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>
      <OverviewCards response={data} />
      <div className="grid gap-6 md:grid-cols-2">
        <TopUserActionsChart response={data} />
        <MostUsersActionsChart response={data} />
      </div>
      <div className="grid gap-6 md:grid-cols-2"></div>
    </div>
  );
}
