"use client";

import Image from "next/image";
import TopNavigation from "@/components/topNavigation/topNavigation";

export default function Home() {
  return (
    <>
      <TopNavigation />
      <div
        className="flex flex-col justify-center items-center h-lvh text-center text-white"
        style={{
          backgroundImage: "linear-gradient(to right, #22c1c3, #fdbb2d)",
        }}
      >
        <div className="font-bold text-[50px]">Welcome to News-X</div>
        <div className="font-medium text-[25px]">Find An Interest Blog Here!</div>
      </div>
    </>
  );
}
