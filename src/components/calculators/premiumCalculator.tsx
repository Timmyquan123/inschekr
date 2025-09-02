"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type InsType = "motor" | "health" | "travel" | "life" | "education";

function ngn(n: number) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}
const Y = () => new Date().getFullYear();

/* -------------------- MOTOR defaults -------------------- */
const THIRD_PARTY_MIN = 15000;      // flat minimum (editable)
const BASE_COMP_RATE = 0.05;       // 4.5% baseline

/* -------------------- HEALTH defaults ------------------- */
const HEALTH_BASE_ADULT = 80000;    // per adult / year
const HEALTH_DEP_RATE   = 50000;    // per dependent / year
const HEALTH_PLAN_MULT  = { basic: 1.0, standard: 1.3, premium: 1.6 } as const;

/* -------------------- TRAVEL defaults ------------------- */
const TRAVEL_RATE_PER_DAY = 1200;   // base per day
const TRAVEL_RISK_MULT    = { low: 1.0, medium: 1.5, high: 2.0 } as const;

/* -------------------- LIFE defaults --------------------- */
// very simplified illustrative rate
function lifeBaseRate(age: number) {
  // ~0.6% at 30, +0.01% per year above 30, floor 0.35%, cap 1.5%
  const base = 0.006 + Math.max(0, age - 30) * 0.0001;
  return Math.min(Math.max(base, 0.0035), 0.015);
}

/* -------------------- EDUCATION defaults ---------------- */
const EDU_SAFETY_FACTOR = 1.1; // +10% buffer
// monthly = target / (years * 12) * safety
// annual  = monthly * 12

const PremiumCalculator: React.FC = () => {
  const [insType, setInsType] = useState<InsType>("motor");

  // shared-ish
  const [driverAge, setDriverAge] = useState("");      // motor
  const [carYear, setCarYear] = useState("");          // motor
  const [carValue, setCarValue] = useState("");        // motor
  const [coverage, setCoverage] = useState<"third" | "comprehensive">("comprehensive");

  const [healthAge, setHealthAge] = useState("");      // health
  const [dependents, setDependents] = useState("0");
  const [plan, setPlan] = useState<"basic" | "standard" | "premium">("standard");

  const [travelDays, setTravelDays] = useState("");
  const [travelRisk, setTravelRisk] = useState<"low" | "medium" | "high">("low");
  const [travelerAge, setTravelerAge] = useState("");

  const [lifeAge, setLifeAge] = useState("");
  const [sumAssured, setSumAssured] = useState("");
  const [lifeTerm, setLifeTerm] = useState("");
  const [smoker, setSmoker] = useState<"no" | "yes">("no");

  const [targetFund, setTargetFund] = useState("");    // education
  const [childAge, setChildAge] = useState("");
  const [yearsToMaturity, setYearsToMaturity] = useState("");

  const result = useMemo(() => {
    const notes: string[] = [];
    let estAnnual = 0;

    if (insType === "motor") {
      const value = Number(carValue) || 0;
      const year = Number(carYear) || Y();
      const age = Number(driverAge) || 30;

      const carAge = Math.max(0, Y() - year);
      let rate = BASE_COMP_RATE;
      if (age < 25) rate += 0.0;           // +1.2%
      if (age >= 60) rate += 0.00;          // +0.6%
      rate += Math.floor(carAge / 5) * 0.005; // +0.5% per 5y
      rate = Math.min(Math.max(rate, 0.03), 0.05);

      const comp = Math.max(value * rate, 35000);
      const third = THIRD_PARTY_MIN;
      estAnnual = coverage === "comprehensive" ? comp : third;

      notes.push(`Motor: Comp rate ${(rate * 100).toFixed(2)}% (base ${(BASE_COMP_RATE * 100).toFixed(1)}%)`);
      if (age < 25) notes.push("Young driver loading applied");
      if (age >= 60) notes.push("Senior driver loading applied");
      if (carAge >= 5) notes.push(`Vehicle age loading (+${(Math.floor(carAge / 5) * 0.5).toFixed(1)}%)`);
      notes.push(`Third-party minimum: ${ngn(THIRD_PARTY_MIN)}`);
    }

    if (insType === "health") {
      const age = Number(healthAge) || 30;
      const deps = Math.max(0, Number(dependents) || 0);
      const mult = HEALTH_PLAN_MULT[plan];

      // simple loading by age brackets
      let ageLoad = 1;
      if (age >= 45 && age < 60) ageLoad = 1.15;
      if (age >= 60) ageLoad = 1.35;

      estAnnual = (HEALTH_BASE_ADULT * ageLoad + HEALTH_DEP_RATE * deps) * mult;

      notes.push(`Health: base adult ${ngn(HEALTH_BASE_ADULT)}, dependent ${ngn(HEALTH_DEP_RATE)}/ea`);
      notes.push(`Plan multiplier: ${plan} ×${mult}`);
      if (ageLoad > 1) notes.push(`Age loading ×${ageLoad}`);
    }

    if (insType === "travel") {
      const days = Math.max(1, Number(travelDays) || 1);
      const riskMult = TRAVEL_RISK_MULT[travelRisk];
      const age = Number(travelerAge) || 30;
      let ageLoad = 1;
      if (age > 65) ageLoad = 1.2;

      estAnnual = TRAVEL_RATE_PER_DAY * days * riskMult * ageLoad;

      notes.push(`Travel: base ${ngn(TRAVEL_RATE_PER_DAY)}/day × ${days} day(s)`);
      notes.push(`Risk multiplier: ${travelRisk} ×${riskMult}`);
      if (ageLoad > 1) notes.push("Senior traveler loading ×1.2");
    }

    if (insType === "life") {
      const age = Number(lifeAge) || 30;
      const sum = Math.max(0, Number(sumAssured) || 0);
      const term = Math.max(1, Number(lifeTerm) || 1);
      let rate = lifeBaseRate(age); // annual base rate on sum assured
      if (smoker === "yes") rate *= 1.25;

      // very simplified: annual premium ~ sumAssured × rate
      // some products spread term benefits; we keep annual
      estAnnual = sum * rate;

      notes.push(`Life: base rate ${(100 * lifeBaseRate(age)).toFixed(2)}% @ age ${age}`);
      if (smoker === "yes") notes.push("Smoker loading ×1.25");
      notes.push(`Sum assured: ${ngn(sum)}, term: ${term}y (illustrative)`);
    }

    if (insType === "education") {
      const target = Math.max(0, Number(targetFund) || 0);
      const years = Math.max(1, Number(yearsToMaturity) || 1);
      // monthly contribution to reach target with a safety buffer
      const monthly = (target / (years * 12)) * EDU_SAFETY_FACTOR;
      estAnnual = monthly * 12;

      notes.push(`Education: target ${ngn(target)} over ${years} year(s)`);
      notes.push(`Safety factor ×${EDU_SAFETY_FACTOR} applied`);
      notes.push(`Approx. monthly: ${ngn(monthly)}`);
    }

    return { estAnnual, notes };
  }, [
    insType,
    // motor
    carValue, carYear, driverAge, coverage,
    // health
    healthAge, dependents, plan,
    // travel
    travelDays, travelRisk, travelerAge,
    // life
    lifeAge, sumAssured, lifeTerm, smoker,
    // education
    targetFund, yearsToMaturity,
  ]);

  return (
    <div className="light-bg-deep p-4 p-md-5 rounded-4">
      <div className="d-flex flex-wrap align-items-end gap-3 justify-content-between">
        <div>
          <h3 className="mb-1">Premium Calculator</h3>
          <p className="mb-0">Select a class and enter details to estimate your premium.</p>
        </div>
        <div className="ms-auto">
          <label className="form-label mb-1">Insurance Class</label>
          <select
            className="form-select"
            value={insType}
            onChange={(e) => setInsType(e.target.value as InsType)}
          >
            <option value="motor">Motor</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="life">Life</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>

      {/* ------- Dynamic forms ------- */}
      <div className="row g-3 mt-3">
        {insType === "motor" && (
          <>
            <div className="col-md-4">
              <label className="form-label">Estimated Car Value (NGN)</label>
              <input className="form-control" type="number" min={0} placeholder="e.g. 4500000"
                     value={carValue} onChange={(e)=>setCarValue(e.target.value)} />
            </div>
            {/* <div className="col-md-4">
              <label className="form-label">Model Year</label>
              <input className="form-control" type="number" min={1980} max={Y()} placeholder="e.g. 2018"
                     value={carYear} onChange={(e)=>setCarYear(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Driver Age</label>
              <input className="form-control" type="number" min={16} max={100} placeholder="e.g. 30"
                     value={driverAge} onChange={(e)=>setDriverAge(e.target.value)} />
            </div> */}
            <div className="col-12 d-flex gap-3 mt-1">
              <label className="form-check">
                <input className="form-check-input" type="radio" name="cov" value="comprehensive"
                       checked={coverage==="comprehensive"} onChange={()=>setCoverage("comprehensive")} />
                <span className="ms-2">Comprehensive</span>
              </label>
              <label className="form-check">
                <input className="form-check-input" type="radio" name="cov" value="third"
                       checked={coverage==="third"} onChange={()=>setCoverage("third")} />
                <span className="ms-2">Third-Party</span>
              </label>
            </div>
          </>
        )}

        {insType === "health" && (
          <>
            <div className="col-md-4">
              <label className="form-label">Your Age</label>
              <input className="form-control" type="number" min={0} max={100} placeholder="e.g. 34"
                     value={healthAge} onChange={(e)=>setHealthAge(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Dependents</label>
              <input className="form-control" type="number" min={0} max={10} placeholder="e.g. 2"
                     value={dependents} onChange={(e)=>setDependents(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Plan</label>
              <select className="form-select" value={plan} onChange={(e)=>setPlan(e.target.value as any)}>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </>
        )}

        {insType === "travel" && (
          <>
            <div className="col-md-4">
              <label className="form-label">Trip Length (days)</label>
              <input className="form-control" type="number" min={1} max={365} placeholder="e.g. 14"
                     value={travelDays} onChange={(e)=>setTravelDays(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Destination Risk</label>
              <select className="form-select" value={travelRisk} onChange={(e)=>setTravelRisk(e.target.value as any)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Traveler Age</label>
              <input className="form-control" type="number" min={0} max={100} placeholder="e.g. 32"
                     value={travelerAge} onChange={(e)=>setTravelerAge(e.target.value)} />
            </div>
          </>
        )}

        {insType === "life" && (
          <>
            <div className="col-md-3">
              <label className="form-label">Age</label>
              <input className="form-control" type="number" min={18} max={80} placeholder="e.g. 35"
                     value={lifeAge} onChange={(e)=>setLifeAge(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Sum Assured (NGN)</label>
              <input className="form-control" type="number" min={100000} step={100000} placeholder="e.g. 5000000"
                     value={sumAssured} onChange={(e)=>setSumAssured(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Policy Term (years)</label>
              <input className="form-control" type="number" min={1} max={40} placeholder="e.g. 10"
                     value={lifeTerm} onChange={(e)=>setLifeTerm(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label d-block">Smoker?</label>
              <div className="d-flex gap-3">
                <label className="form-check">
                  <input className="form-check-input" type="radio" checked={smoker==="no"} onChange={()=>setSmoker("no")} />
                  <span className="ms-2">No</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="radio" checked={smoker==="yes"} onChange={()=>setSmoker("yes")} />
                  <span className="ms-2">Yes</span>
                </label>
              </div>
            </div>
          </>
        )}

        {insType === "education" && (
          <>
            <div className="col-md-4">
              <label className="form-label">Target Fund (NGN)</label>
              <input className="form-control" type="number" min={0} placeholder="e.g. 3000000"
                     value={targetFund} onChange={(e)=>setTargetFund(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Years to Maturity</label>
              <input className="form-control" type="number" min={1} max={25} placeholder="e.g. 8"
                     value={yearsToMaturity} onChange={(e)=>setYearsToMaturity(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Child’s Age (optional)</label>
              <input className="form-control" type="number" min={0} max={21} placeholder="e.g. 6"
                     value={childAge} onChange={(e)=>setChildAge(e.target.value)} />
            </div>
          </>
        )}
      </div>

      {/* ------- Results ------- */}
      <div className="row mt-4 gy-3">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h6 className="text-uppercase text-muted mb-1">Estimated Premium</h6>
              <div className="display-6 fw-bold">{ngn(result.estAnnual)}</div>
              <small className="text-muted">Illustrative estimate (final premium may vary)</small>
            </div>
          </div>
        </div>
        {insType === "education" && (
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h6 className="text-uppercase text-muted mb-1">Approx. Monthly</h6>
                <div className="h4 m-0">{ngn(result.estAnnual / 12)}</div>
                <small className="text-muted">Target savings spread over the term</small>
              </div>
            </div>
          </div>
        )}
      </div>

      <ul className="mt-3 small text-muted">
        {result.notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>

      <div className="mt-3 d-flex gap-3 flex-wrap">
        <Link href="/policy-comparison" className="btn btn-dark rounded-3">Compare Policies</Link>
        <Link href="/contact" className="btn btn-primary rounded-3">Buy Insurance</Link>
      </div>
    </div>
  );
};

export default PremiumCalculator;
