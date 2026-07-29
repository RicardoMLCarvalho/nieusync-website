import type { About } from '../en/about';

const about: About = {
  documentTitle: 'NIEUSYNC - Sobre Nós',

  hero: {
    label: 'A nossa história',
    title: 'Quem somos',
    subtitle:
      'Um parceiro fundamental para sincronizar todas as necessidades do seu negócio, com a proximidade que as PMEs merecem.',
  },

  mission: {
    label: 'A nossa missão',
    title: 'Expertise real, preços justos.',
    quote:
      '"Nascemos da convicção absoluta de que as Startups e PMEs merecem o mesmo nível de expertise que as grandes empresas — sem os preços inacessíveis nem a burocracia desnecessária."',
    body: 'A NIEUSYNC trabalha com empresas nacionais e internacionais. Acreditamos que o crescimento sustentável começa com uma base sólida: jurídica, compliance, digital e tecnológica.',
    stats: [
      { value: '360º', label: 'Visão multidisciplinar' },
      { value: '5', label: 'Áreas especializadas' },
      { value: 'B2B', label: 'Foco exclusivo em empresas' },
      { value: '100%', label: 'Foco em resultados' },
    ],
  },

  values: {
    label: 'Os nossos valores',
    title: 'O que nos guia todos os dias',
    items: [
      {
        title: 'Integração',
        description:
          'Legal, compliance e digital nunca funcionam em silos. Tratamos o seu negócio como um sistema único.',
      },
      {
        title: 'Transparência',
        description:
          'Comunicamos com clareza, sem jargão desnecessário. Sabe sempre o que estamos a fazer e porquê.',
      },
      {
        title: 'Agilidade',
        description:
          'Respondemos o mais rápido possível. Adaptamo-nos facilmente às mudanças do seu negócio e do mercado.',
      },
      {
        title: 'Resultado',
        description:
          'Tudo o que fazemos é medido. Resultados concretos, reportados com dados, desde o primeiro mês.',
      },
    ],
  },

  why: {
    label: 'Porquê a NIEUSYNC?',
    title: 'Tudo o que precisa, numa só parceria.',
    body: "A NIEUSYNC foca-se na Criação, Crescimento e Recuperação de Start-Ups e PME's. Próxima, ágil e completamente orientada para os seus resultados reais.",
    items: [
      { title: 'Multidisciplinar 360º', description: 'Legal, compliance e digital num só lugar' },
      { title: 'Resposta ágil', description: 'Acesso directo à equipa, sem intermediários' },
      { title: 'Decisão com dados', description: 'Relatórios simples para escolhas inteligentes' },
      { title: 'Preço transparente', description: 'Sem surpresas, sem letras pequenas' },
    ],
  },

  cta: {
    title: 'Pronto para trabalhar connosco?',
    subtitle:
      'Uma consulta sem compromisso é tudo o que precisamos para perceber como podemos ajudar.',
    button: 'Agendar Consulta →',
  },
};

export default about;
