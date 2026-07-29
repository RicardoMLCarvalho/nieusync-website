import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../i18n';

interface Section {
  title: string;
  content: string | string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  docTitle: string;
}

export default function LegalPage({ title, subtitle, lastUpdated, sections, docTitle }: LegalPageProps) {
  const t = useT('common');

  useEffect(() => {
    document.title = `NIEUSYNC - ${title}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title]);

  return (
    <main className="pt-[72px]">
      <section className="bg-grad-main py-[60px]">
        <div className="container text-center">
          <Link
            to="/demo/about"
            className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white/65"
          >
            {t.legal.backToAbout}
          </Link>
          <h1 className="mb-3 text-[clamp(28px,4vw,48px)] text-white">{title}</h1>
          <p className="text-sm text-white/65">
            {subtitle} · {t.legal.lastUpdatedLabel} {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-bg pb-20 pt-[60px]">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[260px_1fr]">
            {/* Sidebar TOC */}
            <div className="sticky top-[90px]">
              <div className="card p-6">
                <p className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-purple">
                  {t.legal.tocTitle}
                </p>
                <nav>
                  {sections.map((s, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className={`block py-1.5 text-[13px] font-normal text-blue/70 transition-colors duration-200 hover:text-purple ${
                        i < sections.length - 1 ? 'border-b border-purple/10' : ''
                      }`}
                    >
                      {i + 1}. {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="card mt-4 p-5 text-center">
                <p className="mb-3.5 text-[13px] font-normal text-blue/65">
                  {t.legal.questionsPrompt}
                </p>
                <Link to="/demo/contact" className="btn-gradient px-5 py-2.5 text-xs">
                  {t.legal.contactCta}
                </Link>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="card px-12 py-10">
                <p className="mb-9 border-b border-purple/15 pb-5 text-sm font-normal text-blue/55">
                  {t.legal.documentLabel} <strong className="text-blue">{docTitle}</strong>
                </p>

                {sections.map((section, i) => (
                  <div key={i} id={`section-${i}`} className="mb-10 scroll-mt-[100px]">
                    <h2 className="mb-3.5 flex items-center gap-2.5 text-xl font-bold text-blue">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-grad-main text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {section.title}
                    </h2>
                    {Array.isArray(section.content) ? (
                      <ul className="list-none pl-[38px]">
                        {section.content.map((item, j) => (
                          <li key={j} className="relative py-1 pl-4 text-[15px] font-normal leading-[1.8] text-blue/75">
                            <span className="absolute left-0 font-bold text-purple">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="pl-[38px] text-[15px] font-normal leading-[1.8] text-blue/75">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}

                <div className="mt-2 border-t border-purple/15 pt-6">
                  <p className="text-[13px] font-normal text-blue/45">
                    {t.legal.footerContactBefore}{' '}
                    <a href="mailto:geral@nieusync.com" className="text-purple underline">geral@nieusync.com</a>
                    {' '}{t.legal.footerContactAfter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
