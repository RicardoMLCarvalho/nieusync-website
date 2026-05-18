import LegalPage from '../components/LegalPage';

export default function AvisosLegais() {
  return (
    <LegalPage
      title="Avisos Legais"
      subtitle="Informação jurídica obrigatória"
      lastUpdated="Janeiro 2025"
      docTitle="Avisos Legais — NIEUSYNC, Lda."
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
        },
        {
          title: 'Lei Aplicável e Foro Competente',
          content: 'Este website e os seus termos estão sujeitos à legislação portuguesa. Em caso de litígio, é competente o tribunal da comarca de Santiago do Cacém, com renúncia a qualquer outro.',
        },
        {
          title: 'Alterações aos Avisos Legais',
          content: 'A NIEUSYNC reserva-se o direito de actualizar estes Avisos Legais a qualquer momento, sem aviso prévio. Recomendamos a consulta periódica deste documento. A data da última actualização está indicada no topo da página.',
        },
      ]}
    />
  );
}
