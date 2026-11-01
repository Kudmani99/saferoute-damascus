"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { neighborhoodStats, punctualityStats, routeCompletionStats } from "@/lib/data";

export function NeighborhoodChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={neighborhoodStats}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="students" fill="#1f9d7a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PunctualityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={punctualityStats}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis domain={[70, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="onTime" stroke="#1f9d7a" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="delayed" stroke="#c76442" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CompletionChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={routeCompletionStats} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="route" type="category" tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="completed" fill="#d99a29" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
