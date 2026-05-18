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
          title: 'Divulgação Responsável de Vulnerabilidades',
          content: [
            'Incentivamos a comunicação responsável de vulnerabilidades para geral@nieusync.com com detalhes técnicos, passos de reprodução e impacto esperado.',
            'Não são devidos pagamentos salvo indicação expressa de programa específico.',
            'É proibida a divulgação pública sem prazo razoável de correção acordado com a NIEUSYNC.',            
          ],
        },
        {
          title: 'Emails, Newsletters e Comunicações',
          content: [
            'O envio de newsletters ou convites depende de consentimento (quando exigido) ou de outra base legal válida (ex.: interesse legítimo B2B, com opt‑out claro).',
            'Todas as mensagens incluirão identificação do remetente e mecanismo de cancelamento de subscrição.',            
          ],
        },
        {
          title: 'Exportação, Sanções e Uso Regulamentado',
          content: [
            'O Utilizador não pode usar o Website para atividades sujeitas a sanções internacionais, financiamento ilícito ou exportação de tecnologias controladas sem as autorizações necessárias.',
            'É proibida a promoção de bens/serviços proibidos ou altamente regulados sem prova de elegibilidade legal.',            
          ],
        },
        {
          title: 'Monitorização de Registos',
          content: [
            'A NIEUSYNC pode monitorizar o uso para garantir segurança e conformidade, nos termos da lei e da nossa Política de Privacidade.',
            'Em caso de violação, podemos: (i) emitir aviso, (ii) bloquear conteúdo, (iii) suspender ou terminar acesso, (iv)notificar autoridades, (v) intentar ações legais.',
            'Podemos preservar registos relevantes para investigação e cumprimento de obrigações legais.',            
          ],
        },
        {
          title: 'Alterações',
          content: 'Podemos atualizar esta Política de Uso Aceitável para refletir alterações legais ou operacionais. A versão vigente será publicada no Website com data de revisão.',
        },
      ]}
    />
  );
}
