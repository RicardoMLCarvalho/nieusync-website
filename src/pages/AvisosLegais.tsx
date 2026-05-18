import LegalPage from '../components/LegalPage';

export default function AvisosLegais() {
  return (
    <LegalPage
      title="Avisos Legais"
      subtitle="Informação jurídica obrigatória"
      lastUpdated="Outubro de 2025"
      docTitle="NIEUSYNC, Sociedade Multidisciplinar de Advogados e Consultores SP, Lda."
      sections={[
        {
          title: 'Enquadramento e âmbito',
          content: [
            'Este Aviso Legal deve ser lido em conjunto com os Termos e Condições, a Política de Privacidade e a Política de Cookies do website.',
            'A NIEUSYNC disponibiliza informações no website para fins exclusivamente informativos. Salvo indicação expressa, tais informações não constituem aconselhamento jurídico, fiscal, contabilístico, financeiro, tecnológico, de cibersegurança, de marketing ou de gestão.',
            'Sempre que a lei o exija, asseguramos a disponibilização permanente das informações do prestador previstas no regime português dos serviços da sociedade da informação.',
            ],
        },
        {
          title: 'Ausência de relação profissional e confidencialidade',
          content: [
            'O contacto através do website não estabelece, por si, qualquer relação cliente‑consultor (jurídica, fiscal, financeira, tecnológica ou outra). Tal relação apenas se considera constituída após aceitação formal, por escrito, dos termos de prestação de serviços entre a NIEUSYNC e o Cliente.',
            'Não envie informação confidencial através de formulários genéricos do website. A NIEUSYNC não pode garantir a confidencialidade de comunicações não solicitadas ou não encriptadas.',            
          ],
        },
        {
          title: 'Exatidão, atualidade e disponibilidade',
          content: [
            'Envidamos esforços razoáveis para assegurar a exatidão e atualidade do conteúdo; todavia, podem ocorrer lapsos, omissões ou desatualizações. O conteúdo pode ser alterado, suspenso ou descontinuado sem aviso prévio.',
            'Funcionais/Preferências (consentimento): recordam opções do utilizador e personalizam a experiência.',        
          ],
        },
        {
          title: 'Direitos dos titulares de dados',
          content: [
            'O website pode incluir hiperligações para sites de terceiros. A NIEUSYNC não controla nem é responsável pelo respetivo conteúdo, políticas ou práticas. A inclusão de ligações não implica endosso.',
            'Marcas, logótipos e designações de terceiros exibidos são propriedade dos seus titulares e são referidos apenas para identificação; não é concedida qualquer licença.',
            'Quando a NIEUSYNC atue como prestador intermediário (p. ex., hospedagem de comentários ou submissões), a lei europeia e portuguesa não impõe um dever geral de vigilância; contudo, atuaremos com diligência em regime de notice‑and‑action para remover ou bloquear conteúdos ilícitos de que tenhamos conhecimento.',
           ],
        },
        {
          title: 'Estudos de caso, insights e resultados',
          content: [
            'Estudos de caso, testemunhos e indicadores apresentados ilustram experiências específicas; não garantem resultados idênticos. O desempenho efetivo depende de fatores contextuais (setor, maturidade organizacional, dados, equipa, tecnologia, orçamento e calendário).',
            'Declarações prospetivas (expectativas, metas, intenções) refletem o entendimento à data e estão sujeitas a mudança sem aviso.',            
           ],
        },
        {
          title: 'Segurança e divulgação responsável',
          content: [
            'É proibido contornar ou testar controlos de segurança sem autorização escrita.',
            'Incentivamos a divulgação responsável de vulnerabilidades para geral@nieusync.com, com detalhes suficientes para reprodução. A submissão não confere remuneração, salvo programas comunicados.',            
           ],
        },
        {
          title: 'Limitação de responsabilidade',
          content: [
            'Na extensão máxima permitida por lei, a NIEUSYNC não responde por (i) lucros cessantes, (ii) perda de dados, (iii) danos indiretos, consequentes, especiais ou punitivos decorrentes do uso ou da incapacidade de uso do website ou do conteúdo.',
            'Nada neste Aviso exclui responsabilidades que não possam ser excluídas por lei (v.g., dolo, morte ou lesões pessoais por negligência). Os direitos legais inderrogáveis do consumidor mantêm‑se intactos.',            
           ],
        },
        {
          title: 'Conformidade regulatória e referência legal',
          content: [
            'O tratamento de dados pessoais é regido pelo RGPD e pela Lei n.º 58/2019 (execução nacional). Consulte a nossa Política de Privacidade para mais detalhes.',
            'A utilização de cookies e tecnologias semelhantes segue a Lei n.º 41/2004 (ePrivacy) e a nossa Política de Cookies.', 
            'Quanto à prestação de serviços em linha, observamos o Decreto‑Lei n.º 7/2004, incluindo deveres de informação e o princípio da ausência de dever geral de vigilância sobre conteúdos de terceiros.', 
            'A nível da União, o Digital Services Act (Regulamento (UE) 2022/2065) mantém o princípio de ausência de obrigação geral de monitorização para prestadores intermediários.', 
           ],
        },
      ]}
    />
  );
}
