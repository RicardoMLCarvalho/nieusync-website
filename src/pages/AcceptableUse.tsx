import LegalPage from '../components/LegalPage';
import { useT } from '../i18n';

export default function AcceptableUse() {
  const t = useT('acceptableUse');

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
