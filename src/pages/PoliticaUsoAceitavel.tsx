import LegalPage from '../components/LegalPage';

export default function PoliticaUsoAceitavel() {
  return (
    <LegalPage
      title="Política de Uso Aceitável"
      subtitle="Regras para a utilização responsável dos nossos serviços e plataforma"
      lastUpdated="Janeiro 2025"
      docTitle="Política de Uso Aceitável — NIEUSYNC"
      sections={[
        {
          title: 'Âmbito de Aplicação',
          content: 'Esta Política de Uso Aceitável aplica-se a todos os utilizadores do website da NIEUSYNC, clientes dos nossos serviços e qualquer pessoa que interaja com a NIEUSYNC de forma digital. Ao utilizar os nossos serviços, o utilizador aceita cumprir estas regras.',
        },
        {
          title: 'Utilizações Permitidas',
          content: [
            'Aceder ao website para fins informativos e comerciais legítimos.',
            'Contactar a NIEUSYNC através dos canais disponibilizados para solicitar informações ou serviços.',
            'Partilhar conteúdo do blog com indicação da fonte e link original.',
            'Utilizar os serviços contratados de acordo com os Termos e Condições.',
          ],
        },
        {
          title: 'Utilizações Proibidas',
          content: [
            'Utilizar o website ou os serviços para fins ilegais, fraudulentos ou que violem direitos de terceiros.',
            'Publicar ou transmitir conteúdo ofensivo, difamatório, obsceno ou que incite ao ódio.',
            'Tentar aceder sem autorização a sistemas, redes ou dados da NIEUSYNC.',
            'Realizar ataques de negação de serviço (DoS/DDoS) ou outras formas de perturbação.',
            'Enviar spam ou comunicações não solicitadas através dos nossos formulários.',
            'Extrair dados do website de forma automatizada (web scraping) sem autorização.',
            'Fazer-se passar pela NIEUSYNC ou por qualquer membro da sua equipa.',
            'Reproduzir, modificar ou distribuir conteúdo protegido por direitos de autor sem autorização.',
          ],
        },
        {
          title: 'Utilização dos Serviços de Consultoria',
          content: [
            'Os serviços contratados devem ser utilizados para fins empresariais legítimos.',
            'A informação partilhada pela NIEUSYNC no âmbito dos serviços é confidencial e destina-se exclusivamente ao uso do cliente.',
            'Não é permitido revender ou sublicenciar os serviços da NIEUSYNC sem autorização escrita.',
            'O cliente é responsável por garantir que a informação que partilha com a NIEUSYNC é verdadeira e completa.',
          ],
        },
        {
          title: 'Comunicação Responsável',
          content: [
            'Toda a comunicação com a NIEUSYNC deve ser realizada de forma respeitosa e profissional.',
            'Não serão toleradas ameaças, insultos ou comportamentos abusivos dirigidos à equipa.',
            'A NIEUSYNC reserva-se o direito de terminar relações com clientes ou utilizadores que violem estas regras.',
          ],
        },
        {
          title: 'Segurança e Integridade',
          content: [
            'O utilizador é responsável pela segurança das suas credenciais de acesso a qualquer área reservada.',
            'Deve reportar imediatamente qualquer vulnerabilidade de segurança ou utilização indevida que detecte.',
            'Não é permitida a utilização de ferramentas automatizadas para testar a segurança do website sem autorização.',
          ],
        },
        {
          title: 'Consequências da Violação',
          content: [
            'A violação desta política pode resultar na suspensão ou terminação imediata do acesso aos serviços.',
            'A NIEUSYNC reserva-se o direito de reportar violações às autoridades competentes.',
            'O utilizador pode ser responsabilizado pelos danos causados pela violação desta política.',
            'Não haverá reembolso de valores pagos em caso de terminação por violação desta política.',
          ],
        },
        {
          title: 'Reporte de Violações',
          content: 'Se detectar uma violação desta política ou tiver dúvidas sobre o que constitui uso aceitável, contacte-nos em geral@nieusync.com. Investigaremos todas as denúncias e agiremos em conformidade.',
        },
      ]}
    />
  );
}
