import type { Checkup } from '../en/checkup';

const checkup: Checkup = {
  eyebrow: 'Check-up de Compliance · 2 minutos · gratuito',
  titleBefore: 'O que uma inspeção encontraria na sua empresa ',
  titleHighlight: 'antes de ela acontecer',
  lede:
    'Doze perguntas. No fim, um retrato do risco por área e uma estimativa da exposição a coimas. Sem compromisso e sem custo.',
  metaQuestions: 'perguntas',
  metaInstant: 'Resultado',
  metaInstantLabel: 'imediato',
  metaAuthorities: 'ACT · AT · CNPD · Segurança Social',

  quiz: {
    counter: (n: number, total: number) => `Pergunta ${n} de ${total}`,
    back: '← Anterior',
  },

  areas: {
    labour: 'Laboral',
    hs: 'SST',
    tax: 'Fiscal',
    social: 'Segurança Social',
    gdpr: 'RGPD',
    consumer: 'Consumidor',
    governance: 'Governação',
  },

  questions: [
    {
      text: 'Tem um registo dos tempos de trabalho de todos os trabalhadores, com horas de entrada, saída e intervalos?',
      hint: 'A ACT verifica isto quase sempre. A ausência é contraordenação grave.',
      options: [
        'Sim, atualizado e conservado',
        'Existe, mas nem sempre atualizado',
        'Não temos',
        'Não sei',
      ],
    },
    {
      text: 'Os contratos a termo indicam sempre o motivo justificativo por escrito?',
      hint: 'A omissão do motivo converte o contrato em permanente — e é coima muito grave.',
      options: [
        'Sim, sempre',
        'Na maioria',
        'Não / não verificamos',
        'Não temos contratos a termo',
      ],
    },
    {
      text: 'Tem seguro de acidentes de trabalho com capital igual às retribuições efetivamente pagas?',
      hint: 'Capital insuficiente deixa a empresa a descoberto no essencial. É muito grave.',
      options: [
        'Sim, revisto anualmente',
        'Tenho seguro, não sei se o capital está certo',
        'Não tenho a certeza de ter seguro válido',
        'Não sei',
      ],
    },
    {
      text: 'A avaliação de riscos por posto de trabalho está feita e atualizada?',
      hint: 'Documento base de toda a segurança no trabalho. A falta é muito grave.',
      options: ['Sim, atualizada', 'Feita há mais de 3 anos', 'Não temos', 'Não sei'],
    },
    {
      text: 'Os trabalhadores fazem exames de saúde no trabalho (admissão e periódicos)?',
      hint: 'Obrigatório para todos. As fichas de aptidão têm de existir.',
      options: ['Sim, em dia', 'Alguns em atraso', 'Não fazemos'],
    },
    {
      text: 'Emite todas as faturas em programa certificado e comunica o SAF-T mensalmente?',
      hint: 'A AT cruza dados automaticamente. As falhas são detetadas sem inspeção presencial.',
      options: ['Sim, ambos', 'Faturo certificado, não sei do SAF-T', 'Não / não sei'],
    },
    {
      text: 'As retenções na fonte (IRS/IRC) são entregues até ao dia 20 do mês seguinte?',
      hint: 'O atraso na entrega de imposto retido pode, acima de certo valor, configurar crime.',
      options: [
        'Sim, sempre',
        'Já houve atrasos pontuais',
        'Frequentemente em atraso',
        'Não sei',
      ],
    },
    {
      text: 'As admissões são comunicadas à Segurança Social nas 24 horas anteriores ao início?',
      hint: 'Comunicar depois do início já é infração. É das verificações mais comuns.',
      options: ['Sim, sempre antes', 'Às vezes no próprio dia', 'Comunicamos depois'],
    },
    {
      text: 'Tem registo das atividades de tratamento de dados e política de privacidade?',
      hint: 'A CNPD pode aplicar coimas elevadas. O registo do art. 30.º é o mínimo exigível.',
      options: ['Sim, ambos', 'Só um deles', 'Nenhum', 'Não sei o que é'],
    },
    {
      text: 'Se tem videovigilância: está sinalizada, limitada a 30 dias e sem apontar para postos de trabalho?',
      hint: 'Videovigilância mal configurada é das queixas mais frequentes à CNPD.',
      options: [
        'Sim, tudo conforme',
        'Tenho, mas não tenho a certeza',
        'Não está conforme',
        'Não tenho videovigilância',
      ],
    },
    {
      text: 'Se atende público: tem Livro de Reclamações físico e eletrónico, com o letreiro afixado?',
      hint: 'A ASAE verifica de imediato. A falta é sancionada na hora.',
      options: ['Sim, ambos e afixado', 'Só o físico', 'Não / não afixado', 'Não atendo público'],
    },
    {
      text: 'O RCBE (registo do beneficiário efetivo) está confirmado e a IES foi entregue no prazo?',
      hint: 'Obrigações anuais simples de cumprir, mas cujo esquecimento gera coimas automáticas.',
      options: [
        'Sim, ambos em dia',
        'Um deles em atraso',
        'Ambos por regularizar',
        'Não sei',
      ],
    },
  ],

  bands: [
    {
      label: 'Risco baixo',
      title: 'A sua base está sólida.',
      text: 'Cumpre as obrigações essenciais. Ainda assim, há áreas que só uma verificação documental confirma — e a conformidade de hoje não dispensa a manutenção.',
    },
    {
      label: 'Risco moderado',
      title: 'Há lacunas a corrigir.',
      text: 'Cumpre parte das obrigações, mas identificámos pontos que uma inspeção sinalizaria. A maioria resolve-se com custo baixo — se tratada antes da fiscalização.',
    },
    {
      label: 'Risco elevado',
      title: 'Exposição significativa.',
      text: 'Várias obrigações essenciais parecem por cumprir. A probabilidade de coima numa fiscalização é real e o custo de regularizar agora é uma fração do risco.',
    },
    {
      label: 'Risco crítico',
      title: 'Precisa de agir com urgência.',
      text: 'O diagnóstico revela falhas graves em áreas que os inspetores verificam primeiro. Recomendamos uma auditoria completa com prioridade.',
    },
  ],

  result: {
    exposureLabel: 'Exposição sancionatória estimada',
    exposureNone: 'Sem exposição sinalizada',
    exposureTo: 'a',
    exposureFine:
      'Somatório indicativo das molduras de coima associadas às respostas de risco, ajustado à realidade das PME — em proteção de dados, os máximos legais podem contudo atingir 20 milhões de euros ou 4% do volume de negócios mundial. Não é uma previsão do montante que viria a ser aplicado.',
    exposureNoneFine:
      'Nenhuma resposta sinalizou risco sancionatório direto. Confirmar por verificação documental.',
    pillOk: 'Conforme',
    pillMid: 'A rever',
    pillBad: 'Não conforme',
    pillNa: 'Não aplicável',
    restart: '↺ Recomeçar o diagnóstico',
  },

  lead: {
    title: 'Receba o relatório detalhado',
    subtitle:
      'Enviamos o retrato completo por área e as prioridades de regularização. Sem custo e sem compromisso.',
    nameLabel: 'Nome',
    namePlaceholder: 'O seu nome',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Denominação',
    emailLabel: 'Email',
    emailPlaceholder: 'nome@empresa.pt',
    phoneLabel: 'Telefone',
    phoneOptional: '(opcional)',
    phonePlaceholder: '9XX XXX XXX',
    submit: 'Quero o meu relatório →',
    consent:
      'Autorizo a NIEUSYNC a contactar-me sobre este diagnóstico. Os dados são tratados apenas para este efeito, nos termos do RGPD, e não são partilhados com terceiros.',
    errorName: 'Indique o seu nome.',
    errorEmail: 'Indique um email válido.',
    errorConsent: 'É necessário autorizar o contacto para enviarmos o relatório.',
  },

  done: {
    title: 'Pedido registado',
    text: 'Obrigado. Vamos preparar o seu relatório detalhado e um dos nossos consultores entrará em contacto nos próximos dias úteis.',
    keepBefore: 'Guarde o seu resultado: índice ',
    keepMiddle: ' · exposição estimada ',
    keepAfter: '.',
  },

  disclaimerTitle: 'Nota metodológica.',
  disclaimer:
    'Este autodiagnóstico é uma ferramenta indicativa de sensibilização, não um parecer jurídico nem uma auditoria. O índice e a exposição estimada resultam das respostas fornecidas e de molduras legais abstratas, cuja aplicação concreta depende do grau de culpa, do volume de negócios, da reincidência e de outros fatores. Um resultado favorável não garante a ausência de coima em caso de fiscalização, nem um resultado desfavorável significa que uma coima venha a ser aplicada. A avaliação rigorosa exige auditoria com verificação documental. Os dados introduzidos são tratados nos termos do RGPD e do dever de segredo profissional (art. 92.º do Estatuto da Ordem dos Advogados).',
};

export default checkup;
