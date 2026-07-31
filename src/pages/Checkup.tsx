import { useState } from 'react';
import { useT } from '../i18n';

// Scoring model — parallel by index to i18n `checkup.questions`.
// `values` maps each option to a risk weight (0 = compliant, 1 = full risk,
// 'na' = question does not apply); w is the question weight, min/max the fine bracket.
type Value = number | 'na';
type AreaKey = 'labour' | 'hs' | 'tax' | 'social' | 'gdpr' | 'consumer' | 'governance';

const SCORING: { area: AreaKey; w: number; min: number; max: number; values: Value[] }[] = [
  { area: 'labour',     w: 3, min: 612,  max: 2652,   values: [0, 0.5, 1, 0.8] },
  { area: 'labour',     w: 3, min: 2040, max: 9690,   values: [0, 0.5, 1, 'na'] },
  { area: 'hs',         w: 3, min: 2040, max: 19380,  values: [0, 0.5, 1, 0.8] },
  { area: 'hs',         w: 3, min: 2040, max: 9690,   values: [0, 0.5, 1, 0.8] },
  { area: 'hs',         w: 2, min: 2040, max: 9690,   values: [0, 0.5, 1] },
  { area: 'tax',        w: 2, min: 300,  max: 22500,  values: [0, 0.5, 1] },
  { area: 'tax',        w: 3, min: 300,  max: 22500,  values: [0, 0.5, 1, 0.8] },
  { area: 'social',     w: 2, min: 612,  max: 2652,   values: [0, 0.5, 1] },
  { area: 'gdpr',       w: 2, min: 2500, max: 50000,  values: [0, 0.5, 1, 1] },
  { area: 'gdpr',       w: 2, min: 2500, max: 100000, values: [0, 0.5, 1, 'na'] },
  { area: 'consumer',   w: 2, min: 250,  max: 30000,  values: [0, 0.5, 1, 'na'] },
  { area: 'governance', w: 1, min: 150,  max: 50000,  values: [0, 0.5, 1, 0.8] },
];

const TOTAL = SCORING.length;

type Answer = { idx: number; v: Value };

function bandIndex(score: number) {
  if (score >= 85) return 0;
  if (score >= 65) return 1;
  if (score >= 40) return 2;
  return 3;
}

const BAND_COLOR = ['text-[#4F7A54]', 'text-[#C2701C]', 'text-[#C2701C]', 'text-[#A6432F]'];

function score(answers: (Answer | null)[]) {
  let wsum = 0, rsum = 0, eMin = 0, eMax = 0;
  const areas = new Map<AreaKey, { r: number; w: number }>();

  SCORING.forEach((q, i) => {
    const a = answers[i];
    if (!a) return;
    const area = areas.get(q.area) ?? { r: 0, w: 0 };
    areas.set(q.area, area);
    if (a.v === 'na') return;
    wsum += q.w;
    rsum += a.v * q.w;
    if (a.v > 0) { eMin += q.min * a.v; eMax += q.max * a.v; }
    area.r += a.v * q.w;
    area.w += q.w;
  });

  const risk = wsum ? rsum / wsum : 0;
  return { risk, index: Math.round((1 - risk) * 100), eMin, eMax, areas };
}

export default function Checkup() {
  const t = useT('checkup');
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => new Array(TOTAL).fill(null));
  const [stage, setStage] = useState<'quiz' | 'result' | 'done'>('quiz');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', consent: false });
  const [error, setError] = useState('');

  const result = score(answers);
  const band = bandIndex(result.index);
  const fmt = (n: number) => `${n.toLocaleString('pt-PT', { maximumFractionDigits: 0 })} €`;
  const exposure = result.eMax > 0 ? `${fmt(result.eMin)}–${fmt(result.eMax)}` : '—';

  const answer = (idx: number, v: Value) => {
    const next = [...answers];
    next[cur] = { idx, v };
    setAnswers(next);
    if (cur < TOTAL - 1) setCur(cur + 1);
    else { setStage('result'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const submit = () => {
    if (!form.name.trim()) return setError(t.lead.errorName);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) return setError(t.lead.errorEmail);
    if (!form.consent) return setError(t.lead.errorConsent);
    setError('');
    // ponytail: no backend yet — the submission is not sent anywhere. Wire the
    // payload (form + answers + result) to a CRM endpoint when one exists.
    setStage('done');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setAnswers(new Array(TOTAL).fill(null));
    setCur(0);
    setStage('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = stage === 'quiz' ? (cur / TOTAL) * 100 : 100;

  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[820px] px-6">
        <section className="pb-8 pt-14">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.22em] text-purple">
            {t.eyebrow}
          </p>
          <h1 className="mb-5 font-display text-[clamp(30px,5.4vw,46px)] leading-[1.08] text-blue">
            {t.titleBefore}
            <span className="bg-[linear-gradient(transparent_62%,rgba(159,142,194,0.38)_62%)] px-0.5">
              {t.titleHighlight}
            </span>
            .
          </h1>
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-blue/75">{t.lede}</p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[13.5px] text-blue/60">
            <span className="flex items-center gap-2">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-purple" />
              <b className="text-blue">{TOTAL}</b> {t.metaQuestions}
            </span>
            <span className="flex items-center gap-2">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-purple" />
              {t.metaInstant} <b className="text-blue">{t.metaInstantLabel}</b>
            </span>
            <span className="flex items-center gap-2">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-purple" />
              {t.metaAuthorities}
            </span>
          </div>
        </section>

        <div className="card mb-14 overflow-hidden p-0">
          <div className="h-1 bg-purple/20">
            {/* ponytail: width computed at runtime from the progress value */}
            <i className="block h-full bg-blue transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>

          {stage === 'quiz' && (
            <div className="p-6 md:p-9">
              <div className="mb-3.5 flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-purple">
                <span>{t.quiz.counter(cur + 1, TOTAL)}</span>
                <span className="text-[12.5px] font-semibold normal-case tracking-normal text-blue/60">
                  {t.areas[SCORING[cur].area]}
                </span>
              </div>
              <h2 className="mb-1.5 text-[22px] leading-[1.3] text-blue">{t.questions[cur].text}</h2>
              <p className="mb-6 text-sm text-blue/70">{t.questions[cur].hint}</p>

              <div className="flex flex-col gap-3">
                {t.questions[cur].options.map((label, i) => {
                  const selected = answers[cur]?.idx === i;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => answer(i, SCORING[cur].values[i])}
                      className={`flex w-full items-center gap-3.5 rounded-lg border-[1.5px] bg-bg px-4 py-4 text-left text-[15.5px] text-blue transition-colors hover:border-purple hover:bg-white ${
                        selected ? 'border-blue' : 'border-purple/25'
                      }`}
                    >
                      <span
                        className={`grid h-[26px] w-[26px] flex-none place-items-center rounded-full border-[1.5px] text-[12.5px] font-bold ${
                          selected ? 'border-blue bg-blue text-white' : 'border-purple/30 text-blue/60'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCur(Math.max(0, cur - 1))}
                  disabled={cur === 0}
                  className="cursor-pointer border-none bg-transparent p-2 text-sm text-blue/60 hover:text-blue disabled:invisible"
                >
                  {t.quiz.back}
                </button>
                <div className="flex items-center gap-1.5">
                  {SCORING.map((_, i) => (
                    <i
                      key={i}
                      className={`inline-block h-1.5 w-1.5 flex-none rounded-full transition-transform ${
                        i === cur ? 'scale-[1.3] bg-blue' : i < cur ? 'bg-purple' : 'bg-purple/25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {stage === 'result' && (
            <div>
              <div className="bg-gradient-to-b from-bg to-white px-6 pb-3 pt-10 text-center md:px-9">
                <svg width="260" height="150" viewBox="0 0 260 150" className="mx-auto block overflow-visible">
                  <path d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="#E6E4EF" strokeWidth="16" strokeLinecap="round" />
                  <path
                    d="M30 130 A100 100 0 0 1 230 130"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    /* ponytail: arc and needle depend on the computed risk */
                    style={{ strokeDashoffset: 314 - 314 * (1 - result.risk), transition: 'stroke-dashoffset 1.1s cubic-bezier(.34,1,.5,1)' }}
                  />
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#4F7A54" />
                      <stop offset="0.5" stopColor="#E0913A" />
                      <stop offset="1" stopColor="#A6432F" />
                    </linearGradient>
                  </defs>
                  <g
                    className="origin-[130px_130px] transition-transform duration-1000"
                    style={{ transform: `rotate(${-90 + 180 * result.risk}deg)` }}
                  >
                    <line x1="130" y1="130" x2="130" y2="52" stroke="#233877" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="130" cy="130" r="7" fill="#233877" />
                  </g>
                </svg>
                <div className="font-display text-[52px] leading-none text-blue">{result.index}</div>
                <div className={`mt-2 text-[12px] font-bold uppercase tracking-[0.18em] ${BAND_COLOR[band]}`}>
                  {t.bands[band].label}
                </div>
              </div>

              <div className="px-6 pb-1 pt-1.5 text-center md:px-9">
                <h2 className="mb-2 text-[26px] text-blue">{t.bands[band].title}</h2>
                <p className="mx-auto max-w-[54ch] text-[15.5px] text-blue/75">{t.bands[band].text}</p>
              </div>

              <div className="mx-6 mt-5 rounded-lg bg-blue px-6 py-5 text-white md:mx-9">
                <div className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {t.result.exposureLabel}
                </div>
                <div className="font-display text-[30px]">
                  {result.eMax > 0 ? (
                    <>
                      {fmt(result.eMin)} <small className="text-[16px] font-normal text-white/70">{t.result.exposureTo} {fmt(result.eMax)}</small>
                    </>
                  ) : (
                    t.result.exposureNone
                  )}
                </div>
                <p className="mt-2.5 text-[12.5px] leading-[1.5] text-white/60">
                  {result.eMax > 0 ? t.result.exposureFine : t.result.exposureNoneFine}
                </p>
              </div>

              <div className="px-6 pb-2 pt-6 md:px-9">
                {[...result.areas.entries()].map(([area, a]) => {
                  const ratio = a.w ? a.r / a.w : 0;
                  const [cls, label] =
                    a.w === 0 ? ['bg-purple/15 text-blue/60', t.result.pillNa]
                    : ratio <= 0.15 ? ['bg-[#4F7A54]/15 text-[#4F7A54]', t.result.pillOk]
                    : ratio <= 0.55 ? ['bg-[#E0913A]/20 text-[#C2701C]', t.result.pillMid]
                    : ['bg-[#A6432F]/15 text-[#A6432F]', t.result.pillBad];
                  return (
                    <div key={area} className="flex items-center gap-3.5 border-b border-purple/15 py-3 last:border-b-0">
                      <div className="flex-1 text-[14.5px] text-blue">{t.areas[area]}</div>
                      <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${cls}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-purple/20 px-6 pb-9 pt-7 md:px-9">
                <h3 className="mb-1.5 text-[21px] text-blue">{t.lead.title}</h3>
                <p className="mb-5 text-[14.5px] text-blue/60">{t.lead.subtitle}</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cu-name">{t.lead.nameLabel}</label>
                    <input id="cu-name" type="text" placeholder={t.lead.namePlaceholder}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="cu-company">{t.lead.companyLabel}</label>
                    <input id="cu-company" type="text" placeholder={t.lead.companyPlaceholder}
                      value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="cu-email">{t.lead.emailLabel}</label>
                    <input id="cu-email" type="email" placeholder={t.lead.emailPlaceholder}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="cu-phone">
                      {t.lead.phoneLabel} <span className="font-normal normal-case text-blue/50">{t.lead.phoneOptional}</span>
                    </label>
                    <input id="cu-phone" type="tel" placeholder={t.lead.phonePlaceholder}
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>

                {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}

                <button type="button" onClick={submit} className="btn-gradient mt-5 w-full justify-center">
                  {t.lead.submit}
                </button>

                <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] font-normal normal-case leading-[1.5] tracking-normal text-blue/60">
                  <input type="checkbox" checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t.lead.consent}</span>
                </label>
              </div>

              <div className="pb-9 text-center">
                <button type="button" onClick={restart}
                  className="cursor-pointer border-none bg-transparent text-[13.5px] text-blue/60 underline">
                  {t.result.restart}
                </button>
              </div>
            </div>
          )}

          {stage === 'done' && (
            <div className="px-6 py-14 text-center md:px-9">
              <div className="mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-full bg-[#4F7A54]/15">
                {/* ponytail: inline SVG — this repo has no icon library */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#4F7A54" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mb-3 text-[26px] text-blue">{t.done.title}</h2>
              <p className="mx-auto max-w-[46ch] text-[15.5px] text-blue/75">{t.done.text}</p>
              <p className="mt-3.5 text-[13.5px] text-blue/60">
                {t.done.keepBefore}<b className="text-blue">{result.index}</b>
                {t.done.keepMiddle}<b className="text-blue">{exposure}</b>{t.done.keepAfter}
              </p>
            </div>
          )}
        </div>

        <p className="pb-14 text-[12px] leading-[1.6] text-blue/60">
          <b className="text-blue">{t.disclaimerTitle}</b> {t.disclaimer}
        </p>
      </div>
    </main>
  );
}
