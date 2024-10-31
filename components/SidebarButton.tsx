// components/SidebarButton.js

import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

const SidebarButton = ({ path, icon: Icon, label }) => {
  const pathname = usePathname(); // Get the current path

  return (
    <Button
      className={`w-full h-20 flex flex-col items-center justify-center mb-2 rounded-none ${
        pathname === path ? "bg-ez_blue" : "bg-white"
      } text-black`}
    >
      <Icon
        className={`font-bold !h-6 !w-6 mb-2 ${
          pathname === path ? "text-white" : "text-black"
        }`}
      />
      <span
        className={`text-sm font-bold ${
          pathname === path ? "text-white" : "text-black"
        }`}
      >
        {label}
      </span>
    </Button>
  );
};

export default SidebarButton;
