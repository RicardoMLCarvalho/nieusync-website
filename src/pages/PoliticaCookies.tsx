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
          title: 'Enquadramento e âmbito',
          content: 'Esta Política explica como a NIEUSYNC utiliza cookies e tecnologias semelhantes no website. Cumprimos a Lei n.º 41/2004 (transposição da Diretiva ePrivacy) e o RGPD. Em Portugal, a colocação de cookies não estritamente necessários exige consentimento prévio e informado; os cookies estritamente necessários podem ser utilizados sem consentimento. "A CNPD recorda que os responsáveis pelos websites devem informar os utilizadores e obter o consentimento quando exigido, sendo responsáveis pelos cookies que autorizam colocar nos dispositivos dos utilizadores."',
        },
        {
          title: 'O que são cookies e tecnologias semelhantes',
          content: '“Cookies” são pequenos ficheiros armazenados no seu dispositivo quando visita o nosso site. Tecnologias semelhantes (p. ex., Local Storage, pixels, SDKs) podem ter finalidades equivalentes e estão abrangidas pelas mesmas regras do “cookie rule” da ePrivacy.',
        },
        {
          title: 'Categorias de cookies que podemos utilizar',
          content: [
            'Estritamente necessários (sem consentimento): essenciais para o funcionamento e segurança do site (gestão de sessão, balanceamento de carga, preferência de idioma).',
            'Cookies de Analíticos/Estatísticos (consentimento): Recolhem informação anónima sobre a utilização do website (páginas visitadas, tempo de permanência, erros). Utilizamos Google Analytics para este fim.',
            'Cookies Funcionais/Preferências (consentimento): recordam opções do utilizador e personalizam a experiência.',
            'Cookies de Marketing/Publicidade (consentimento): Utilizados para apresentar anúncios relevantes. Podem incluir cookies do Meta Pixel e Google Ads.',
            'Nota sobre consentimento válido: não são permitidas caixas pré‑selecionadas para aceitar cookies; o consentimento deve ser expresso (opt‑in) e livre, sendo tão fácil recusar como aceitar.', 
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
        {
          title: 'Direitos dos titulares de dados',
          content: [
            'Estritamente necessários: excepcionados do consentimento pela ePrivacy (art. 5.º, n.º 3).',
            'Restantes categorias: dependem de consentimento. O interesse legítimo não é base legal suficiente para colocar cookies; pode ser relevante para tratamentos subsequentes de dados depois de os cookies serem legitimamente colocados.',            
          ],
        },       
        {
          title: 'Como gerimos o seu consentimento',
          content: [
            'Banner de consentimento: no primeiro acesso, apresentamos opções claras “Aceitar tudo”, “Rejeitar tudo” e “Configurar preferências”. O utilizador pode retirar (ou alterar) o consentimento a qualquer momento em [Gerir preferências de cookies] (ligação permanente no rodapé). Princípios alinhados com o Relatório do EDPB sobre Banners de Cookies.',
            'Validade/expiração do consentimento: renovamos o pedido de consentimento periodicamente ou quando mudarem as finalidades/terceiros.',       
          ],
        },
        {
          title: 'Gestão de cookies pelo utilizador',
          content: [
            'No nosso site: altere a qualquer momento em [Gerir preferências de cookies].',
            'No navegador: pode bloquear/eliminar cookies nas definições do seu navegador (atenção que certas funcionalidades poderão deixar de funcionar).',
            'Opt‑out de analítica/publicidade: alguns fornecedores oferecem mecanismos próprios de opt‑out.',
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
          title: 'Terceiros e transferências',
          content: 'Determinadas ferramentas (analítica, A/B testing, publicidade) implicam cookies de terceiros e transferência de dadospara fora do EEE. Nesses casos, aplicamos medidas adequadas (contratuais e técnicas) e só ativamos a recolha após consentimento.',
        },
        {
          title: 'Retenção e revisão',
          content: 'Conservamos registos de consentimento e revemos periodicamente os cookies, fornecedores e finalidades. Atualizaremos esta Política sempre que houver alterações relevantes.',
        },
      ]}
    />
  );
}
