import Link from "next/link";
import {
  Bell,
  Bus,
  CalendarClock,
  Gauge,
  MapPinned,
  Route,
  School,
  ShieldCheck,
  Users
} from "lucide-react";
import { DynamicRouteMap } from "@/components/DynamicRouteMap";
import { MiniStat } from "@/components/MiniStat";
import { routes } from "@/lib/data";

const features = [
  { title: "Parent Tracking", icon: MapPinned, text: "Live pickup progress and route context for families." },
  { title: "Driver Route Coordination", icon: Route, text: "Clear stop order, timing, and daily route status." },
  { title: "Smart Pickup Scheduling", icon: CalendarClock, text: "Neighborhood-aware pickup windows for busy mornings." },
  { title: "School Transportation Dashboard", icon: School, text: "School-level coverage, attendance, and delay visibility." },
  { title: "Route Optimization", icon: Gauge, text: "Mock routing logic that accounts for Damascus congestion patterns." },
  { title: "Delay Notifications", icon: Bell, text: "Simple alerts for checkpoint delays and heavy school-zone traffic." }
];

const steps = [
  "Schools create transportation routes",
  "Parents register students",
  "Drivers follow optimized pickup routes",
  "Parents receive transportation updates"
];

export default function HomePage() {
  return (
    <main>
      <nav className="border-b border-black/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3 font-bold text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">
              <Bus size={20} />
            </span>
            <span>SafeRoute Damascus</span>
          </Link>
          <div className="hidden items-center gap-5 text-sm font-medium text-basalt md:flex">
            <Link href="/register">Register</Link>
            <Link href="/driver">Driver</Link>
            <Link href="/school">School Admin</Link>
          </div>
        </div>
      </nav>

      <section className="bg-[linear-gradient(135deg,#f7f4ec_0%,#eef3ed_48%,#f7ead8_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-saffron">Smarter school transportation for Damascus</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-ink md:text-6xl">
              Reliable School Transportation for Damascus
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-basalt/80">
              Helping schools, parents, and drivers coordinate safer and smarter transportation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft" href="/driver">
                View Live Routes
              </Link>
              <Link className="rounded-lg border border-ink/20 bg-white px-5 py-3 text-center font-semibold text-ink" href="/register">
                Register Student
              </Link>
            </div>
          </div>
          <div>
            <DynamicRouteMap route={routes[0]} height={430} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <MiniStat label="Students transported" value="368" icon={<Users size={20} />} />
          <MiniStat label="Routes completed" value="1,284" icon={<Route size={20} />} />
          <MiniStat label="Schools supported" value="14" icon={<School size={20} />} />
          <MiniStat label="On-time arrival rate" value="92%" icon={<ShieldCheck size={20} />} />
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <h2 className="text-3xl font-black text-ink">Built for Damascus school mornings</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-black/10 bg-paper p-5">
                  <Icon className="text-mint" size={26} />
                  <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-basalt/75">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-3xl font-black text-ink">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-lg border border-black/10 bg-white p-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-saffron text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="mt-5 font-semibold text-basalt">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
