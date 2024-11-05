"use client";
import DatabaseSelect from "@/components/DatabaseSelect";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Departments = () => {
  const [data, setData] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/query?queryType=databases");
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await (await response.json()).data;
      setData(result?.sort()); // Update state with the new data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    </div>
  );
};

export default Detailed;
