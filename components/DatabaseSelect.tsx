import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

const DatabaseSelect = ({ databases, onSelect }) => {
  const [selectedDatabase, setSelectedDatabase] = useState(databases[0] || "");

  const handleSelect = (value) => {
    setSelectedDatabase(value);
    onSelect(value); // Call parent function to handle the selected database
  };

  return (
    <Select value={selectedDatabase} onValueChange={handleSelect}>
      <SelectTrigger className="inline-flex items-center px-4 py-2 bg-ez_blue_40 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200">
        <SelectValue placeholder="Select a database" />
      </SelectTrigger>

      <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
        {databases.map((db) => (
          <SelectItem
            key={db}
            value={db}
            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
          >
            <span>{db}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DatabaseSelect;
