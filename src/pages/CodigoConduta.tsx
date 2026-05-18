import LegalPage from '../components/LegalPage';

export default function CodigoConduta() {
  return (
    <LegalPage
      title="Código de Conduta"
      subtitle="Princípios e valores que guiam a nossa actividade"
      lastUpdated="Agosto de 2025"
      docTitle="Código de Conduta — NIEUSYNC"
      sections={[
        {
          title: 'Propósito e Âmbito',
          content: 'O presente Código de Conduta estabelece os princípios éticos e profissionais que orientam a actuação da NIEUSYNC, dos seus colaboradores, parceiros e prestadores de serviços. Aplica-se a todas as interacções profissionais, internas e externas, incluindo relações com clientes, parceiros, fornecedores e a comunidade em geral.',
        },
        {
          title: 'Integridade e Ética Profissional',
          content: [
            'Agimos sempre com honestidade, transparência e integridade em todas as nossas interacções.',
            'Não aceitamos nem oferecemos subornos, presentes ou qualquer forma de benefício indevido.',
            'Declaramos potenciais conflitos de interesse e adoptamos medidas adequadas para os gerir.',
            'Cumprimos rigorosamente toda a legislação aplicável à nossa actividade.',
          ],
        },
        {
          title: 'Relação com Clientes',
          content: [
            'Colocamos sempre os interesses dos clientes em primeiro lugar.',
            'Prestamos informação clara, completa e verdadeira sobre os nossos serviços e respectivos custos.',
            'Mantemos a confidencialidade de toda a informação partilhada pelos clientes.',
            'Não assumimos compromissos que não possamos cumprir.',
            'Gerimos as expectativas de forma realista e baseada em dados.',
          ],
        },
        {
          title: 'Diversidade, Inclusão e Respeito',
          content: [
            'Valorizamos a diversidade e tratamos todas as pessoas com igualdade e respeito.',
            'Não toleramos qualquer forma de discriminação, assédio ou comportamento ofensivo.',
            'Promovemos um ambiente de trabalho inclusivo e psicologicamente seguro.',
            'Respeitamos as diferenças culturais, religiosas e de opinião.',
          ],
        },
        {
          title: 'Responsabilidade Ambiental e Social',
          content: [
            'Adoptamos práticas de trabalho responsáveis e sustentáveis.',
            'Promovemos o trabalho remoto e digital para reduzir a nossa pegada ambiental.',
            'Apoiamos activamente o ecossistema empresarial português, especialmente PMEs e Startups.',
            'Participamos em iniciativas de responsabilidade social sempre que possível.',
          ],
        },
        {
          title: 'Protecção de Dados e Privacidade',
          content: 'Tratamos os dados pessoais com o máximo rigor e em conformidade com o Regulamento Geral sobre a Protecção de Dados (RGPD). Não partilhamos informação confidencial de clientes com terceiros sem consentimento expresso.',
        },
        {
          title: 'Comunicação Responsável',
          content: [
            'Comunicamos de forma clara, respeitosa e construtiva em todos os canais.',
            'Não difundimos informação falsa, enganosa ou prejudicial.',
            'Respeitamos a propriedade intelectual e citamos correctamente as fontes.',
            'Nas redes sociais, distinguimos claramente opiniões pessoais de posições institucionais.',
          ],
        },
        {
          title: 'Reporte de Violações',
          content: 'Qualquer violação deste Código de Conduta deve ser reportada através de geral@nieusync.com. Garantimos a confidencialidade do denunciante e não permitimos retaliações contra quem reporte violações de boa-fé.',
        },
      ]}
    />
  );
}
