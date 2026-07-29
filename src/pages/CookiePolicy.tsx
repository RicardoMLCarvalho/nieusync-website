import LegalPage from '../components/LegalPage';
import { useT } from '../i18n';

export default function CookiePolicy() {
  const t = useT('cookiePolicy');

  return (
    <LegalPage
      title={t.title}
      subtitle={t.subtitle}
      lastUpdated={t.lastUpdated}
      docTitle={t.docTitle}
      sections={t.sections}
    />
  );
}
