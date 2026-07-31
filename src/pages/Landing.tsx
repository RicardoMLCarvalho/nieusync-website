import { useEffect } from 'react';
import { useT, LanguageToggle } from '../i18n';

// ponytail: port of the old static site `nieusync/landingpage` (GitHub Pages)
// into the app. That repo is gone — this page is the only version.
export default function Landing() {
  const t = useT('landing');

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-grad-main px-6">
      <LanguageToggle className="absolute right-6 top-6 text-white" />

      <img
        className="mb-10 w-[180px] max-w-[45vw] animate-pulse-soft"
        src="/logo_white_1080x1080.png"
        alt="NIEUSYNC"
      />

      {/* font-sans: index.css forces 'Magistral' on h1 — the landing uses Montserrat 800 */}
      <h1 className="mb-5 max-w-[700px] text-center font-sans text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.2] tracking-[-0.5px] text-white">
        {t.headingBefore}<span className="text-[#c9bfe0]">{t.headingHighlight}</span>{t.headingAfter}
      </h1>

      <p className="mb-2 max-w-[480px] text-center text-[clamp(14px,2vw,16px)] leading-[1.6] text-white/80">{t.body}</p>
      <p className="mb-9 max-w-[480px] text-center text-[clamp(14px,2vw,16px)] leading-[1.6] text-white/80">{t.bodyLast}</p>

      <div className="flex gap-2.5">
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white" />
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white [animation-delay:0.2s]" />
        <span className="h-2.5 w-2.5 animate-blink rounded-full bg-white [animation-delay:0.4s]" />
      </div>

      <footer className="absolute bottom-6 text-center text-[13px] text-white/60">
        {t.urgentPrefix}{' '}
        <a href="mailto:geral@nieusync.com">geral@nieusync.com</a>
      </footer>
    </div>
  );
}
