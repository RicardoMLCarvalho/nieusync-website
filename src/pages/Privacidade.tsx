import LegalPage from '../components/LegalPage';

export default function Privacidade() {
  return (
    <LegalPage
      title="Política de Privacidade"
      subtitle="Como recolhemos, utilizamos e protegemos os seus dados pessoais"
      lastUpdated="Janeiro 2025"
      docTitle="Política de Privacidade (RGPD) — NIEUSYNC"
      sections={[
        {
          title: 'Responsável pelo Tratamento',
          content: 'A NIEUSYNC é a entidade responsável pelo tratamento dos seus dados pessoais. Para exercer os seus direitos ou colocar questões relacionadas com a privacidade, contacte: geral@nieusync.com | (+351) 269 030 096.',
        },
        {
          title: 'Dados Pessoais Recolhidos',
          content: [
            'Dados de identificação: Nome, apelido, email profissional e número de telefone.',
            'Dados profissionais: Nome da empresa, sector de actividade e cargo.',
            'Dados de comunicação: Mensagens enviadas através do formulário de contacto.',
            'Dados de navegação: Endereço IP, tipo de browser, páginas visitadas (via cookies analíticos).',
            'Dados de newsletter: Email para envio de comunicações, se subscrito.',
          ],
        },
        {
          title: 'Finalidades e Base Legal do Tratamento',
          content: [
            'Resposta a pedidos de contacto e informação: Execução de diligências pré-contratuais (Art. 6.º, n.º 1, al. b) RGPD).',
            'Prestação de serviços contratados: Execução de contrato (Art. 6.º, n.º 1, al. b) RGPD).',
            'Envio de newsletter: Consentimento do titular (Art. 6.º, n.º 1, al. a) RGPD).',
            'Análise de utilização do website: Interesse legítimo (Art. 6.º, n.º 1, al. f) RGPD).',
            'Cumprimento de obrigações legais: Obrigação legal (Art. 6.º, n.º 1, al. c) RGPD).',
          ],
        },
        {
          title: 'Partilha de Dados com Terceiros',
          content: [
            'Não vendemos os seus dados pessoais a terceiros.',
            'Podemos partilhar dados com prestadores de serviços (hosting, email, analytics) que actuam como subcontratantes e estão sujeitos a acordo de tratamento de dados.',
            'Podemos divulgar dados quando exigido por lei ou por autoridade competente.',
            'Em caso de fusão ou aquisição, os dados poderão ser transferidos, com notificação prévia.',
          ],
        },
        {
          title: 'Período de Conservação',
          content: [
            'Dados de contacto e clientes: 5 anos após o término da relação contratual.',
            'Dados de newsletter: Até cancelamento da subscrição.',
            'Dados de análise (cookies analíticos): Máximo de 26 meses.',
            'Dados de facturação: 10 anos, conforme obrigações fiscais.',
          ],
        },
        {
          title: 'Direitos dos Titulares',
          content: [
            'Direito de acesso: Obter confirmação do tratamento e cópia dos dados.',
            'Direito de rectificação: Corrigir dados inexactos ou incompletos.',
            'Direito ao apagamento: Solicitar a eliminação dos dados (direito ao esquecimento).',
            'Direito à portabilidade: Receber os seus dados em formato estruturado.',
            'Direito de oposição: Opor-se ao tratamento baseado em interesse legítimo.',
            'Direito de limitação: Solicitar a limitação do tratamento em determinadas circunstâncias.',
            'Direito de retirar consentimento: A qualquer momento, sem afectar a licitude do tratamento anterior.',
          ],
        },
        {
          title: 'Exercício de Direitos e Reclamações',
          content: 'Para exercer os seus direitos, contacte geral@nieusync.com. Responderemos no prazo de 30 dias. Tem ainda o direito de apresentar reclamação à Comissão Nacional de Protecção de Dados (CNPD), em www.cnpd.pt.',
        },
        {
          title: 'Segurança dos Dados',
          content: 'Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda, destruição ou divulgação. Utilizamos encriptação SSL/TLS em todas as comunicações.',
        },
        {
          title: 'Transferências Internacionais',
          content: 'Alguns dos nossos prestadores de serviços podem estar localizados fora da UE/EEE. Nestes casos, asseguramos que as transferências se realizam com as garantias adequadas, incluindo cláusulas contratuais-tipo aprovadas pela Comissão Europeia.',
        },
      ]}
    />
  );
}
