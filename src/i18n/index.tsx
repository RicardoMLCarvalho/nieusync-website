import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import en from './en';
import pt from './pt';

const dicts = { en, pt };
export type Lang = keyof typeof dicts;

const STORAGE_KEY = 'nieusync_lang';

function detect(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'pt') return saved;
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detect);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export function useLang() {
  return useContext(I18nContext);
}

// Returns a namespace of the active dictionary. Typed off the English dictionary,
// so a key missing from pt/ is a compile error rather than a runtime blank.
export function useT<K extends keyof typeof en>(ns: K): (typeof en)[K] {
  const { lang } = useContext(I18nContext);
  return dicts[lang][ns];
}

export function LanguageToggle({ style }: { style?: CSSProperties }) {
  const { lang, setLang } = useLang();
  const next: Lang = lang === 'en' ? 'pt' : 'en';

  return (
    <button
      onClick={() => setLang(next)}
      aria-label={next === 'pt' ? 'Mudar para português' : 'Switch to English'}
      style={{
        background: 'none',
        border: '1px solid currentColor',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '0.08em',
        color: 'inherit',
        padding: '6px 10px',
        minHeight: '32px',
        opacity: 0.75,
        ...style,
      }}
    >
      {next.toUpperCase()}
    </button>
  );
}
