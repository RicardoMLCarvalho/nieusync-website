import LegalPage from '../components/LegalPage';

export default function TermosCondicoes() {
  return (
    <LegalPage
      title="Termos e Condições"
      subtitle="Condições gerais de utilização e de prestação de serviços"
      lastUpdated="Outubro de 2025"
      docTitle="Termos e Condições Gerais — NIEUSYNC"
      sections={[
        {
          title: 'Objeto e Aceitação',
          content: [
            'Os presentes Termos regulam o acesso e a utilização do website [www.nieusync.pt] e dos conteúdos, funcionalidades ou serviços disponibilizados.',
            'Ao aceder ou utilizar o Website, o Utilizador declara que leu, compreendeu e aceita os Termos. Se não concordar, deverá cessar a utilização.',
            'A Equipa de TI da NIEUSYNC poderá atualizar estes Termos. Alterações materiais serão comunicadas no Website. O uso continuado após a publicação implica aceitação.',
            'A NIEUSYNC reserva-se o direito de recusar a prestação de serviços a qualquer cliente.',
          ],
        },
        {
          title: 'Definições',
          content: 
            '“Utilizador” significa qualquer pessoa que acede ao Website. “Conteúdo” inclui textos, imagens, gráficos, logótipos, vídeos, software e outros materiais. ',            
        },
        {
          title: 'Condições de Utilização do Website',
          content: [
            'O website destina-se exclusivamente a fins informativos e comerciais legítimos.',
            'É proibida qualquer utilização do website que viole a lei, os direitos de terceiros ou a boa-fé.',
            'Não é permitida a extracção automática de dados (scraping) do website sem autorização.',
            'A NIEUSYNC pode suspender o acesso ao website a qualquer momento, sem aviso prévio.',
          ],
        },
        {
          title: 'Preços e Condições de Pagamento',
          content: [
            'Os preços dos serviços são apresentados em proposta comercial individualizada.',
            'Todos os preços são indicados em euros e acrescidos de IVA à taxa legal em vigor.',
            'As condições de pagamento são definidas contratualmente.',
            'O incumprimento dos prazos de pagamento pode resultar na suspensão dos serviços.',
          ],
        },
        {
          title: 'Direitos de Propriedade Intelectual',
          content: 'Os materiais, relatórios, estratégias e outros entregáveis produzidos no âmbito dos serviços prestados são propriedade da NIEUSYNC até integral pagamento do preço acordado. Após pagamento, os direitos de utilização são transferidos para o cliente nos termos definidos no contrato.',
        },
        {
          title: 'Confidencialidade',
          content: [
            'A NIEUSYNC compromete-se a manter a confidencialidade de toda a informação partilhada pelos clientes.',
            'Os clientes comprometem-se a não divulgar informações confidenciais da NIEUSYNC.',
            'As obrigações de confidencialidade mantêm-se após a conclusão da relação contratual.',
          ],
        },
        {
          title: 'Limitação de Responsabilidade',
          content: 'A responsabilidade da NIEUSYNC por danos causados ao cliente está limitada ao valor total dos serviços prestados no mês em que ocorreu o facto danoso. A NIEUSYNC não é responsável por danos indirectos, lucros cessantes ou danos emergentes.',
        },
        {
          title: 'Resolução do Contrato',
          content: [
            'Qualquer das partes pode resolver o contrato com aviso prévio de 30 dias.',
            'A resolução imediata é possível em caso de incumprimento grave por qualquer das partes.',
            'Em caso de resolução, os serviços prestados até à data são devidos na totalidade.',
          ],
        },
        {
          title: 'Alterações aos Termos',
          content: 'A NIEUSYNC reserva-se o direito de actualizar estes Termos e Condições. As alterações produzem efeitos imediatos para novos contratos. Os contratos em vigor mantêm-se sujeitos aos termos vigentes à data da sua celebração, salvo acordo em contrário.',
        },
        {
          title: 'Lei Aplicável',
          content: 'Os presentes Termos e Condições são regidos pela lei portuguesa. Em caso de litígio, as partes comprometem-se a tentar resolver o conflito amigavelmente antes de recorrer aos tribunais. É competente o tribunal da comarca de Santiago do Cacém.',
        },
      ]}
    />
  );
}
