"use client";
import { BarChartIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "/public/sidebar_logo.png";
import Image from "next/image";
import SidebarButton from "./SidebarButton";

function Sidebar() {
  return (
    <aside className="w-24 bg-white border-r-2">
      <div className=" grid place-items-center">
        <Image
          className="pb-8"
          src={Logo}
          alt="Logo"
          width={126} // Adjust the size accordingly
          height={126} // You can style the logo if needed
        />
      </div>
      <nav>
        <Link href="/" passHref>
          <SidebarButton path="/" icon={HomeIcon} label="Ülevaade" />
        </Link>
        <Link href="/detailed" passHref>
          <SidebarButton
            path="/detailed"
            icon={BarChartIcon}
            label="Detailsem"
          />
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
