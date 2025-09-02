'use client';

import React, { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// assets (reuse from your template)

import icon_1 from '@/assets/images/icon/icon_72.svg';
import icon_2 from '@/assets/images/icon/icon_73.svg';
import icon_3 from '@/assets/images/icon/icon_74.svg';
import icon_4 from '@/assets/images/icon/icon_75.svg';
import icon_10 from '@/assets/images/icon/icon_81.svg';
import icon_11 from '@/assets/images/icon/icon_82.svg';
import icon_12 from '@/assets/images/icon/icon_83.svg';
import icon_13 from '@/assets/images/icon/icon_84.svg';
import ils_icon from '@/assets/images/assets/ils_03.svg';

const imgStyle = { height: 'auto' } as const;

function ServiceNav({
  icon,
  title,
  url,
  active,
}: {
  icon: StaticImageData;
  title: string;
  url: string;
  active?: boolean;
}) {
  return (
    <li>
      <Link href={url} className={`d-flex align-items-center w-100 ${active ? 'active' : ''}`}>
        <Image src={icon} alt="icon" className="lazy-img" />
        <span>{title}</span>
      </Link>
    </li>
  );
}

function CardItem({
  icon,
  title,
  subtitle,
}: {
  icon: StaticImageData;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="card-style-sixteen text-center mt-40">
      <div className="icon m-auto tran3s rounded-circle d-flex align-items-center justify-content-center">
        <Image src={icon} alt="icon" className="lazy-img" />
      </div>
      <h4 className="fw-bold mt-35 lg-mt-30 mb-15">{title}</h4>
      <p className="m0">{subtitle}</p>
    </div>
  );
}

/* =========================
   DATA: Nigerian Insurance Classes
   ========================= */
type TableRow = { feature: string; cells: (boolean | string)[] };

type ClassTable = {
  columns: string[];
  rows: TableRow[];
  notes?: string[];
};

const CLASS_TITLES = [
  'Motor',
  'Fire',
  'Marine Cargo',
  'Health (HMO)',
  'Travel',
  'Life (Term)',
  'Personal Accident',
] as const;
type ClassKey = typeof CLASS_TITLES[number];

const TABLES: Record<ClassKey, ClassTable> = {
  Motor: {
    columns: ['Third-Party', 'Third-Party Fire & Theft', 'Comprehensive'],
    rows: [
      { feature: 'Third-party property damage', cells: [true, true, true] },
      { feature: 'Third-party bodily injury', cells: [true, true, true] },
      { feature: 'Fire (your vehicle)', cells: [false, true, true] },
      { feature: 'Theft (your vehicle)', cells: [false, true, true] },
      { feature: 'Accidental damage (your vehicle)', cells: [false, false, true] },
      { feature: 'Windscreen', cells: ['—', 'Optional', 'Optional/Included'] },
      { feature: 'Personal effects', cells: ['—', '—', 'Optional/Included'] },
      { feature: 'Excess (out-of-pocket)', cells: ['Low', 'Medium', 'Varies by plan'] },
    ],
    notes: [
      'Third-Party is the legal minimum; Comprehensive offers the widest cover.',
      'Benefits vary by insurer; always review policy schedule & wording.',
    ],
  },

  Fire: {
    columns: ['Basic Fire', 'Fire + Allied Perils', 'Industrial/Enhanced'],
    rows: [
      { feature: 'Fire & Lightning', cells: [true, true, true] },
      { feature: 'Explosion (domestic)', cells: [true, true, true] },
      { feature: 'Allied Perils (storm, flood, impact)', cells: [false, true, true] },
      { feature: 'Burglary with forcible entry', cells: [false, 'Optional', true] },
      { feature: 'Business interruption (loss of profits)', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Debris removal & professional fees', cells: ['—', 'Optional', 'Optional/Included'] },
      { feature: 'Contents/Stock', cells: ['Optional', 'Optional', 'Optional/Included'] },
    ],
    notes: [
      'Sum insured should reflect replacement value (buildings/contents).',
      'Flood & storm may be subject to special terms depending on location.',
    ],
  },

  'Marine Cargo': {
    columns: ['ICC(C) Basic', 'ICC(B) Intermediate', 'ICC(A) All Risks'],
    rows: [
      { feature: 'Named perils (e.g., fire, stranding)', cells: [true, true, true] },
      { feature: 'Theft/Pilferage', cells: [false, 'Limited', true] },
      { feature: 'General average & salvage charges', cells: [true, true, true] },
      { feature: 'War & strikes (add-ons)', cells: ['Optional', 'Optional', 'Optional'] },
      { feature: 'Warehouse-to-warehouse', cells: ['Optional', 'Optional', 'Included'] },
      { feature: 'Breakage/Water damage (goods)', cells: [false, 'Limited', true] },
      { feature: 'Deductibles/Excess', cells: ['Applies', 'Applies', 'Applies'] },
    ],
    notes: [
      'Covers imports/exports; institute clauses (A/B/C) set coverage scope.',
      'Commodity, packing, and voyage affect premium & terms.',
    ],
  },

  'Health (HMO)': {
    columns: ['Basic', 'Standard', 'Enhanced'],
    rows: [
      { feature: 'Primary care (GP/Clinic)', cells: [true, true, true] },
      { feature: 'Specialist consultation', cells: ['Limited', true, true] },
      { feature: 'Diagnostics (labs, scans)', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Maternity', cells: ['—/Optional', 'Optional', 'Included (limits apply)'] },
      { feature: 'Emergency & ambulance', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Hospitalization (in-patient)', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Dental & optical', cells: ['—/Optional', 'Optional', 'Optional/Included'] },
      { feature: 'Pre-existing conditions', cells: ['Waiting period', 'Waiting period', 'Broader with terms'] },
    ],
    notes: [
      'Provider networks & limits vary by HMO; check benefit tables & exclusions.',
      'Maternity often has a waiting period; confirm timelines & limits.',
    ],
  },

  Travel: {
    columns: ['Schengen Basic', 'Worldwide Standard', 'Worldwide Plus'],
    rows: [
      { feature: 'Emergency medical expenses', cells: ['€30k–€60k', '$50k–$100k', '$100k–$500k'] },
      { feature: 'Medical evacuation/repatriation', cells: [true, true, true] },
      { feature: 'Trip cancellation/curtailment', cells: ['—/Optional', 'Optional', 'Included'] },
      { feature: 'Baggage loss/delay', cells: ['Limited', 'Standard', 'Enhanced'] },
      { feature: 'Personal liability', cells: ['—/Optional', 'Optional', 'Included'] },
      { feature: 'Visa letter support', cells: [true, true, true] },
    ],
    notes: [
      'Choose coverage to match embassy requirements and destination healthcare costs.',
      'Age limits and pre-existing conditions may affect eligibility.',
    ],
  },

  'Life (Term)': {
    columns: ['Pure Term', 'Term + Accidental Death', 'Term + Riders'],
    rows: [
      { feature: 'Death benefit (sum assured)', cells: [true, true, true] },
      { feature: 'Accidental death benefit', cells: [false, true, 'Optional/Included'] },
      { feature: 'Critical illness rider', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Permanent disability rider', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Premium waiver', cells: [false, 'Optional', 'Optional/Included'] },
      { feature: 'Cash value/savings', cells: ['No', 'No', 'No (term plans)'] },
      { feature: 'Policy term', cells: ['5–30 yrs', '5–30 yrs', '5–30 yrs'] },
    ],
    notes: [
      'Term life provides pure protection; no cash value.',
      'Underwriting depends on age, health, sum assured, and occupation.',
    ],
  },

  'Personal Accident': {
    columns: ['Basic', 'Standard', 'Enhanced'],
    rows: [
      { feature: 'Accidental death', cells: [true, true, true] },
      { feature: 'Permanent disability (PTD/PPD)', cells: ['Limited', true, 'Enhanced'] },
      { feature: 'Temporary total disability (TTD)', cells: ['—', 'Optional', 'Included (weekly benefit)'] },
      { feature: 'Medical expenses (accident)', cells: ['Limited', 'Standard', 'Enhanced'] },
      { feature: 'Hospital cash', cells: ['—', 'Optional', 'Optional/Included'] },
      { feature: 'Funeral expenses', cells: ['—', 'Optional', 'Optional/Included'] },
      { feature: 'Sports/motorcycling (terms)', cells: ['Exclusions apply', 'Exclusions apply', 'Exclusions with buy-back'] },
    ],
    notes: [
      'Benefits are paid as fixed sums or reimbursements per schedule.',
      'Certain high-risk activities may be excluded unless bought back.',
    ],
  },
};

/* =========================
   UI Helpers
   ========================= */
function TickCell(v: boolean | string) {
  if (typeof v === 'boolean') {
    return <span>{v ? '✔️' : '—'}</span>;
  }
  return <span>{v}</span>;
}

function ClassTabs({
  selected,
  onSelect,
}: {
  selected: ClassKey;
  onSelect: (k: ClassKey) => void;
}) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      {CLASS_TITLES.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onSelect(k)}
          className={`btn ${selected === k ? 'btn-dark' : 'btn-outline-dark'} rounded-3`}
        >
          {k}
        </button>
      ))}
    </div>
  );
}

/* =========================
   PAGE
   ========================= */
const PolicyComparison: React.FC = () => {
  const [klass, setKlass] = useState<ClassKey>('Motor');
  const table = useMemo(() => TABLES[klass], [klass]);

  return (
    <div className="service-details mt-150 lg-mt-80 mb-100 lg-mb-80">
      <div className="container">
        <div className="row">
          {/* Main Column */}
          <div className="col-xxl-9 col-lg-8 order-lg-last">
            <div className="details-meta ps-xxl-5 ps-xl-3">
              <h2>Policy Comparison — InSchekr</h2>
              <p>
                Compare Nigerian insurance classes side by side — including{' '}
                <strong>Motor</strong>, <strong>Fire</strong>, <strong>Marine Cargo</strong>,{' '}
                <strong>Health</strong>, <strong>Travel</strong>, <strong>Life (Term)</strong>, and{' '}
                <strong>Personal Accident</strong>. Use the tabs to switch classes, then review benefits across
                typical plan levels.
              </p>

              

              {/* Tabs + Table */}
              <div className="light-bg-deep p-4 p-md-5 rounded-4">
                <div className="d-flex flex-column gap-2">
                  <h3 className="mb-2">Compare Policies</h3>
                  <ClassTabs selected={klass} onSelect={setKlass} />

                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th className="text-muted">Feature</th>
                          {table.columns.map((c, i) => (
                            <th key={i}>{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((r, idx) => (
                          <tr key={idx}>
                            <td className="text-muted">{r.feature}</td>
                            {r.cells.map((c, ii) => (
                              <td key={ii}>{TickCell(c)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {!!table.notes?.length && (
                    <ul className="small text-muted mt-2 mb-0">
                      {table.notes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 d-flex gap-3 flex-wrap">
                    <Link href="/service-details" className="btn btn-dark rounded-3">
                      Estimate Premium
                    </Link>
                    <Link href="/contact" className="btn btn-primary rounded-3">
                      Buy Insurance
                    </Link>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <h3 className="mt-60 lg-mt-40">How It Works</h3>
              <p>Three quick steps to choose confidently:</p>
              <div className="line-wrapper pb-30 mt-40 lg-mt-30 mb-70 lg-mb-40">
                <div className="row">
                  <div className="col-md-4 wow fadeInUp">
                    <CardItem
                      icon={icon_10}
                      title="Pick a Class"
                      subtitle="Switch tabs to Motor, Fire, Marine, Health, Travel, Life, or PA."
                    />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                    <CardItem
                      icon={icon_11}
                      title="Compare Benefits"
                      subtitle="See coverage differences across typical plan levels."
                    />
                  </div>
                  <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                    <CardItem
                      icon={icon_12}
                      title="Estimate & Buy"
                      subtitle="Use the calculator, then proceed to purchase."
                    />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="light-bg-deep quote-wrapper position-relative mb-60 lg-mb-40">
                <div className="d-xl-flex align-items-start">
                  <Image src={icon_13} alt="icon" className="lazy-img icon" />
                  <div className="ps-xl-5">
                    <blockquote>
                      This made it easy to understand what I’m getting for each plan. I chose exactly what I needed.
                    </blockquote>
                    <div><span className="fw-bold">Chika N.</span> Lagos</div>
                  </div>
                </div>
                <Image src={ils_icon} alt="ils_icon" className="lazy-img shapes shape_01" />
              </div>

              <h3>Notes</h3>
              <ul className="style-none list-item pb-20">
                <li>Coverage, limits, and exclusions vary by insurer and policy wording.</li>
                <li>Some benefits may require add-ons or riders; waiting periods may apply (e.g., health, maternity).</li>
                <li>Always review your quotation, schedule, and full policy wording before purchase.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xxl-3 col-lg-4 order-lg-first">
            <aside className="md-mt-40">
              <div className="service-nav-item">
                <ul className="style-none">
                  <ServiceNav icon={icon_1} title="Premium Calculator" url="/service-details" />
                  <ServiceNav icon={icon_2} title="VIN / Chassis Decoder" url="/vin-decoder" />
                  <ServiceNav icon={icon_3} title="Car Value Estimator" url="/car-value-estimator" />
                  
                  <ServiceNav icon={icon_4} title="Compare Policies" url="/policy-comparison" active />
                </ul>
              </div>

              <div className="contact-banner text-center mt-40 lg-mt-20">
                <h3 className="mb-20">Any Questions? Let’s talk</h3>
                <Link href="/contact" className="tran3s fw-500">Let’s Talk</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyComparison;
