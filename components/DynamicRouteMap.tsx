"use client";

import dynamic from "next/dynamic";

export const DynamicRouteMap = dynamic(
  () => import("./RouteMap").then((module) => module.RouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-lg border border-black/10 bg-white text-sm text-basalt/70">
        Loading Damascus route map...
      </div>
    )
  }
);
