import LegalPage from '../components/LegalPage';
import { useT } from '../i18n';

export default function Terms() {
  const t = useT('terms');

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
