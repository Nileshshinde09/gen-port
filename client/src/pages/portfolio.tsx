import DefaultPortfolios from "@/app/default";
import React, { useEffect } from "react";
import { SiVercel } from "react-icons/si";
import { useParams, useSearchParams } from "react-router-dom";
const Portfolio = () => {
  const { username, id } = useParams();
  const [searchParams] = useSearchParams();
  const demoValue = searchParams.get("demo");
  if (demoValue === "true" && id && DefaultPortfolios[id]) {
    const Component = DefaultPortfolios[id][1];
    return (
      <div className="w-full h-full relative">
        <div className="fixed flex flex-col gap-5 mt-20">
          <div className=" flex justify-end items-center pr-5 z-[9999] w-32 h-12 border-border border bg-neutral-950 rounded-r-full">
            <span className="mr-3">Deploy</span>{" "}
            <SiVercel size={25} className="cursor-pointer" />
          </div>
          <div className=" flex justify-end items-center pr-5 z-[9999] w-fit px-5 h-12 border-border border bg-neutral-950 rounded-r-full">
            <span className="mr-3">Make Default Resume</span>{" "}
            <SiVercel size={25} className="cursor-pointer" />
          </div>
        </div>
        <Component />;
      </div>
    );
  }
  return null;
};

export default Portfolio;
