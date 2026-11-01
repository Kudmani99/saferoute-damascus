"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, MapPinned, Users } from "lucide-react";
import { DynamicRouteMap } from "@/components/DynamicRouteMap";
import { MiniStat } from "@/components/MiniStat";
import { StatusPill } from "@/components/StatusPill";
import { alerts, routes, type RouteStatus } from "@/lib/data";

export default function DriverDashboardPage() {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0].id);
  const [routeStatuses, setRouteStatuses] = useState<Record<string, RouteStatus>>({});
  const [pickedUp, setPickedUp] = useState<Record<string, boolean>>({});

  const route = useMemo(
    () => routes.find((item) => item.id === selectedRouteId) ?? routes[0],
    [selectedRouteId]
  );
  const status = routeStatuses[route.id] ?? route.status;
  const passengerCount = route.stops.length;
  const completedPickups = route.stops.filter((stop) => pickedUp[stop.id] ?? stop.pickedUp).length;

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-basalt">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-saffron">Driver dashboard</p>
            <h1 className="mt-3 text-4xl font-black text-ink">Morning route command center</h1>
            <p className="mt-3 max-w-2xl leading-7 text-basalt/75">
              Track assigned students, route timing, mock traffic alerts, and checkpoint delays for Damascus school transportation.
            </p>
          </div>
          <select
            className="rounded-lg border border-black/10 bg-white px-4 py-3 font-semibold text-basalt"
            value={selectedRouteId}
            onChange={(event) => setSelectedRouteId(event.target.value)}
          >
            {routes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <MiniStat label="Passenger count" value={String(passengerCount)} icon={<Users size={20} />} />
          <MiniStat label="Picked up" value={`${completedPickups}/${passengerCount}`} icon={<CheckCircle2 size={20} />} />
          <MiniStat label="Estimated arrival" value={route.estimatedArrival} icon={<Clock size={20} />} />
          <MiniStat label="Checkpoint delay" value={`${route.delayMinutes} min`} icon={<AlertTriangle size={20} />} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-5">
            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-black text-ink">{route.name}</h2>
                  <p className="mt-1 text-sm text-basalt/70">{route.driver} - {route.minibus}</p>
                </div>
                <StatusPill status={status} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg bg-mint px-4 py-2 text-sm font-bold text-white" onClick={() => setRouteStatuses((current) => ({ ...current, [route.id]: "On time" }))}>
                  On time
                </button>
                <button className="rounded-lg bg-clay px-4 py-2 text-sm font-bold text-white" onClick={() => setRouteStatuses((current) => ({ ...current, [route.id]: "Delayed" }))}>
                  Running late
                </button>
                <button className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white" onClick={() => setRouteStatuses((current) => ({ ...current, [route.id]: "Completed" }))}>
                  Route completed
                </button>
              </div>
            </div>

            <DynamicRouteMap route={route} height={430} />
          </section>

          <aside className="space-y-5">
            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-ink">Pickup schedule</h2>
              <div className="mt-5 space-y-3">
                {route.stops.map((stop) => {
                  const isPickedUp = pickedUp[stop.id] ?? stop.pickedUp;
                  return (
                    <div key={stop.id} className="rounded-lg border border-black/10 bg-paper p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-ink">{stop.student}</p>
                          <p className="text-sm text-basalt/70">{stop.grade} - {stop.neighborhood}</p>
                          <p className="mt-2 text-sm text-basalt">{stop.pickupTime} - {stop.address}</p>
                        </div>
                        <button
                          className={`rounded-lg px-3 py-2 text-xs font-bold ${isPickedUp ? "bg-mint text-white" : "bg-white text-basalt ring-1 ring-black/10"}`}
                          onClick={() => setPickedUp((current) => ({ ...current, [stop.id]: !isPickedUp }))}
                        >
                          {isPickedUp ? "Picked up" : "Mark pickup"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-ink">Traffic alerts</h2>
              <div className="mt-4 space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.title} className="rounded-lg border border-black/10 bg-paper p-4">
                    <div className="flex gap-3">
                      <MapPinned className="mt-1 text-saffron" size={18} />
                      <div>
                        <p className="font-bold text-ink">{alert.title}</p>
                        <p className="mt-1 text-sm leading-6 text-basalt/75">{alert.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
