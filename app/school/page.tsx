"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bus, ClipboardCheck, Gauge, School, Users } from "lucide-react";
import { CompletionChart, NeighborhoodChart, PunctualityChart } from "@/components/Charts";
import { MiniStat } from "@/components/MiniStat";
import { routes } from "@/lib/data";
import { registrationsKey, type StudentRegistration } from "@/lib/registration";

export default function SchoolDashboardPage() {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);

  useEffect(() => {
    setRegistrations(JSON.parse(localStorage.getItem(registrationsKey) ?? "[]") as StudentRegistration[]);
  }, []);

  const totalMockStudents = useMemo(
    () => routes.reduce((total, route) => total + route.stops.length, 0) + registrations.length,
    [registrations.length]
  );
  const activeDrivers = routes.filter((route) => route.status !== "Completed").length;
  const lateRoutes = routes.filter((route) => route.status === "Delayed").length;
  const averageDelay = Math.round(routes.reduce((total, route) => total + route.delayMinutes, 0) / routes.length);

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-basalt">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-saffron">School admin dashboard</p>
          <h1 className="mt-3 text-4xl font-black text-ink">Transportation operations overview</h1>
          <p className="mt-3 max-w-2xl leading-7 text-basalt/75">
            Monitor registrations, active drivers, neighborhood coverage, punctuality, route completion, and late-arrival trends.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <MiniStat label="Total students registered" value={String(totalMockStudents)} icon={<Users size={20} />} />
          <MiniStat label="Drivers active" value={String(activeDrivers)} icon={<Bus size={20} />} />
          <MiniStat label="Transportation coverage" value="87%" icon={<School size={20} />} />
          <MiniStat label="Late routes today" value={String(lateRoutes)} icon={<Gauge size={20} />} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-black text-ink">Student count by neighborhood</h2>
            <div className="mt-5">
              <NeighborhoodChart />
            </div>
          </section>
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Attendance transportation report</h2>
            <div className="mt-5 space-y-4">
              <ReportRow label="Morning pickups completed" value="94%" />
              <ReportRow label="Parent confirmations" value="81%" />
              <ReportRow label="Unassigned requests" value={String(registrations.length)} />
              <ReportRow label="Average delay" value={`${averageDelay} min`} />
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Transportation punctuality</h2>
            <div className="mt-5">
              <PunctualityChart />
            </div>
          </section>
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-ink">Route completion</h2>
            <div className="mt-5">
              <CompletionChart />
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-mint" size={22} />
            <h2 className="text-xl font-black text-ink">Route efficiency metrics</h2>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-basalt/70">
                  <th className="py-3">Route</th>
                  <th>Driver</th>
                  <th>Students</th>
                  <th>Distance</th>
                  <th>Checkpoint delays</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id} className="border-b border-black/5">
                    <td className="py-3 font-semibold text-ink">{route.name}</td>
                    <td>{route.driver}</td>
                    <td>{route.stops.length}</td>
                    <td>{route.distanceKm} km</td>
                    <td>{route.delayMinutes} min</td>
                    <td>{Math.max(74, 100 - route.delayMinutes * 2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-paper px-4 py-3">
      <span className="text-basalt/75">{label}</span>
      <strong className="text-ink">{value}</strong>
    </div>
  );
}
