import { useEffect } from 'react';
import { useT, LanguageToggle } from '../i18n';

// ponytail: porte do site estático ../landingpage (GitHub Pages) para dentro da app.
// Estilos com escopo em .landing em vez de body, para não afectar as outras rotas.
export default function Landing() {
  const t = useT('landing');

  useEffect(() => {
    document.title = t.documentTitle;
  }, [t.documentTitle]);

  return (
    <div className="landing">
      <LanguageToggle style={{ position: 'absolute', top: '24px', right: '24px', color: '#fff' }} />

      <img className="landing-logo" src="/logo_white_1080x1080.png" alt="NIEUSYNC" />

      <h1>
        {t.headingBefore}<span>{t.headingHighlight}</span>{t.headingAfter}
      </h1>

      <p>{t.body}</p>
      <p className="last">{t.bodyLast}</p>

      <div className="landing-dots">
        <span className="landing-dot" />
        <span className="landing-dot" />
        <span className="landing-dot" />
      </div>

      <footer>
        {t.urgentPrefix}{' '}
        <a href="mailto:geral@nieusync.com">geral@nieusync.com</a>
      </footer>

      <style>{`
        .landing {
          position: fixed;
          inset: 0;
          font-family: "Montserrat", sans-serif;
          background: linear-gradient(135deg, #233877 0%, #9f8ec2 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          box-sizing: border-box;
        }
        .landing-logo {
          width: 180px;
          max-width: 45vw;
          margin-bottom: 40px;
          animation: landing-pulse 3s ease-in-out infinite;
        }
        .landing h1 {
          /* index.css força 'Magistral' em h1 — a landing usa Montserrat 800 */
          font-family: "Montserrat", sans-serif;
          color: #fff;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.2;
          text-align: center;
          max-width: 700px;
          margin: 0 0 20px;
          letter-spacing: -0.5px;
        }
        .landing h1 span { color: #c9bfe0; }
        .landing p {
          color: rgba(255, 255, 255, 0.8);
          font-size: clamp(14px, 2vw, 16px);
          line-height: 1.6;
          text-align: center;
          max-width: 480px;
          margin: 0 0 8px;
        }
        .landing p.last { margin-bottom: 36px; }
        .landing-dots { display: flex; gap: 10px; }
        .landing-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          animation: landing-blink 1.4s infinite both;
        }
        .landing-dot:nth-child(2) { animation-delay: 0.2s; }
        .landing-dot:nth-child(3) { animation-delay: 0.4s; }
        .landing footer {
          position: absolute;
          bottom: 24px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          text-align: center;
        }
        .landing footer a { color: inherit; }
        @keyframes landing-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes landing-blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
