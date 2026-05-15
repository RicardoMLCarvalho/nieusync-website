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
          title: 'Identificação da Empresa',
          content: 'A NIEUSYNC é uma consultora B2B multidisciplinar portuguesa, constituída sob a forma de sociedade comercial, com sede no Alentejo Litoral, Portugal. A empresa presta serviços nas áreas de Direito Empresarial, Gestão Estratégica e Marketing Digital a PMEs, Startups e empresas em crescimento. Para contacto: geral@nieusync.com | (+351) 269 030 096.',
        },
        {
          title: 'Propriedade Intelectual',
          content: [
            'Todo o conteúdo deste website, incluindo textos, imagens, logótipos, gráficos e código, é propriedade da NIEUSYNC ou dos seus licenciantes.',
            'É proibida a reprodução, distribuição ou utilização de qualquer conteúdo sem autorização prévia e escrita da NIEUSYNC.',
            'A marca NIEUSYNC e o respectivo logótipo são marcas registadas da empresa.',
            'Os artigos do blog podem ser partilhados com indicação clara da fonte e link para o artigo original.',
          ],
        },
        {
          title: 'Limitação de Responsabilidade',
          content: [
            'As informações disponibilizadas neste website têm carácter meramente informativo e não constituem aconselhamento jurídico, financeiro ou de qualquer outra natureza.',
            'A NIEUSYNC não se responsabiliza por eventuais danos resultantes da utilização das informações contidas neste website.',
            'O aconselhamento profissional é prestado exclusivamente no âmbito de contratos de prestação de serviços formalmente celebrados.',
            'A NIEUSYNC não garante a exactidão, integridade ou actualidade das informações publicadas.',
          ],
        },
        {
          title: 'Links para Sites Externos',
          content: 'Este website pode conter links para websites de terceiros. A NIEUSYNC não é responsável pelo conteúdo, políticas de privacidade ou práticas de qualquer website de terceiros. A inclusão de links não implica endorsement ou aprovação do respectivo conteúdo.',
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
