"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Bus, CheckCircle2 } from "lucide-react";
import { DynamicRouteMap } from "@/components/DynamicRouteMap";
import { findSuggestedRoute, getSchoolName, neighborhoods, schools } from "@/lib/data";
import { registrationsKey, type StudentRegistration } from "@/lib/registration";

const emptyForm = {
  studentName: "",
  grade: "",
  schoolId: schools[0].id,
  parentPhone: "",
  neighborhood: neighborhoods[0],
  homeAddress: "",
  pickupTime: "7:00 AM",
  emergencyContact: "",
  preference: "Round trip" as StudentRegistration["preference"]
};

export default function RegisterPage() {
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState<StudentRegistration | null>(null);
  const assignedRoute = useMemo(() => findSuggestedRoute(form.neighborhood), [form.neighborhood]);

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const registration: StudentRegistration = {
      ...form,
      id: crypto.randomUUID(),
      assignedRouteId: assignedRoute.id,
      createdAt: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem(registrationsKey) ?? "[]") as StudentRegistration[];
    localStorage.setItem(registrationsKey, JSON.stringify([registration, ...current]));
    setSaved(registration);
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-basalt">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-saffron">Parent registration</p>
          <h1 className="mt-3 text-4xl font-black text-ink">Register a student for school transportation</h1>
          <p className="mt-4 leading-7 text-basalt/75">
            This local prototype saves registrations in your browser and assigns a realistic route preview based on pickup neighborhood.
          </p>
          <form onSubmit={submitRegistration} className="mt-8 grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <label className="grid gap-2 text-sm font-semibold text-basalt">
              Student name
              <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.studentName} onChange={(e) => updateField("studentName", e.target.value)} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                Grade
                <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.grade} onChange={(e) => updateField("grade", e.target.value)} placeholder="Grade 4" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                School
                <select className="rounded-lg border border-black/10 px-3 py-3" value={form.schoolId} onChange={(e) => updateField("schoolId", e.target.value)}>
                  {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                Parent phone number
                <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.parentPhone} onChange={(e) => updateField("parentPhone", e.target.value)} placeholder="+963 9xx xxx xxx" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                Pickup neighborhood
                <select className="rounded-lg border border-black/10 px-3 py-3" value={form.neighborhood} onChange={(e) => updateField("neighborhood", e.target.value)}>
                  {neighborhoods.map((name) => <option key={name}>{name}</option>)}
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-basalt">
              Home address
              <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.homeAddress} onChange={(e) => updateField("homeAddress", e.target.value)} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                Preferred pickup time
                <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.pickupTime} onChange={(e) => updateField("pickupTime", e.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-basalt">
                Emergency contact
                <input required className="rounded-lg border border-black/10 px-3 py-3" value={form.emergencyContact} onChange={(e) => updateField("emergencyContact", e.target.value)} />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-basalt">
              Transportation preference
              <select className="rounded-lg border border-black/10 px-3 py-3" value={form.preference} onChange={(e) => updateField("preference", e.target.value)}>
                <option>Morning only</option>
                <option>Afternoon only</option>
                <option>Round trip</option>
              </select>
            </label>
            <button className="rounded-lg bg-ink px-5 py-3 font-bold text-white" type="submit">
              Submit Registration
            </button>
          </form>
        </div>

        <aside className="space-y-5">
          {saved ? (
            <div className="rounded-lg border border-mint/30 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-mint">
                <CheckCircle2 size={24} />
                <h2 className="text-xl font-black">Registration saved locally</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-basalt/75">
                {saved.studentName} has been assigned to {assignedRoute.name} for {getSchoolName(saved.schoolId)}.
              </p>
            </div>
          ) : null}
          <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-saffron text-white"><Bus size={20} /></span>
              <div>
                <h2 className="font-black text-ink">Assigned route preview</h2>
                <p className="text-sm text-basalt/70">{assignedRoute.name}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-basalt">
              <p><strong>Driver:</strong> {assignedRoute.driver}</p>
              <p><strong>Estimated arrival:</strong> {assignedRoute.estimatedArrival}</p>
              <p><strong>Checkpoint delays:</strong> {assignedRoute.delayMinutes} min mock delay</p>
            </div>
          </div>
          <DynamicRouteMap route={assignedRoute} />
        </aside>
      </section>
    </main>
  );
}
