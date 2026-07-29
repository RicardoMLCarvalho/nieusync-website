import LegalPage from '../components/LegalPage';
import { useT } from '../i18n';

export default function LegalNotices() {
  const t = useT('legalNotices');

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
