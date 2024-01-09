import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default Home;
