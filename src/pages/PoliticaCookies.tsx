import LegalPage from '../components/LegalPage';

export default function PoliticaCookies() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Como utilizamos cookies e tecnologias similares"
      lastUpdated="Janeiro 2025"
      docTitle="Política de Cookies — NIEUSYNC"
      sections={[
        {
          title: 'O que são Cookies?',
          content: 'Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo quando visita um website. Permitem que o website reconheça o seu dispositivo e recorde informações sobre a sua visita, como as suas preferências de idioma e outras definições.',
        },
        {
          title: 'Cookies que Utilizamos',
          content: [
            'Cookies estritamente necessários: Essenciais para o funcionamento do website. Sem eles, determinadas funcionalidades não estão disponíveis. Não requerem consentimento.',
            'Cookies de desempenho: Recolhem informação anónima sobre a utilização do website (páginas visitadas, tempo de permanência, erros). Utilizamos Google Analytics para este fim.',
            'Cookies funcionais: Guardam as suas preferências (como o consentimento de cookies) para personalizar a sua experiência.',
            'Cookies de marketing: Utilizados para apresentar anúncios relevantes. Podem incluir cookies do Meta Pixel e Google Ads.',
          ],
        },
        {
          title: 'Cookies de Terceiros',
          content: [
            'Google Analytics: Para análise de tráfego e comportamento dos utilizadores.',
            'Google Ads: Para medição da eficácia das campanhas publicitárias.',
            'Meta Pixel (Facebook): Para remarketing e análise de conversões.',
            'LinkedIn Insight Tag: Para análise de audiências profissionais.',
          ],
        },
        {
          title: 'Gestão de Cookies',
          content: [
            'Pode aceitar ou recusar cookies não essenciais através do banner apresentado na sua primeira visita.',
            'Pode alterar as suas preferências a qualquer momento nas definições do seu browser.',
            'A recusa de cookies pode afectar a funcionalidade e experiência de utilização do website.',
            'A maioria dos browsers permite gerir cookies através das definições de privacidade.',
          ],
        },
        {
          title: 'Duração dos Cookies',
          content: [
            'Cookies de sessão: São eliminados quando fecha o browser.',
            'Cookies persistentes: Permanecem no dispositivo até expirar ou serem eliminados manualmente. A duração varia entre 30 dias e 2 anos, dependendo do tipo.',
            'O cookie de preferências de privacidade da NIEUSYNC tem duração de 12 meses.',
          ],
        },
        {
          title: 'Actualizações desta Política',
          content: 'Esta Política de Cookies pode ser actualizada periodicamente para reflectir alterações nas tecnologias utilizadas ou na legislação aplicável. Recomendamos a consulta regular deste documento.',
        },
        {
          title: 'Contacto',
          content: 'Para questões relacionadas com a utilização de cookies, contacte-nos através de geral@nieusync.com ou (+351) 269 030 096.',
        },
      ]}
    />
  );
}
