import type { Contact } from '../en/contact';

const contact: Contact = {
  documentTitle: 'NIEUSYNC - Contactos · Agendar Consulta',

  hero: {
    label: 'Contactos',
    title: 'Fale connosco',
    subtitle: 'Uma consulta de 30 minutos pode mudar a forma como gere o seu negócio.',
  },

  info: {
    title: 'Entre em contacto',
    body: 'A nossa equipa está disponível para responder a qualquer questão e ajudar a perceber qual o melhor caminho para o seu negócio.',
    labels: {
      phone: 'Telefone',
      mobile: 'Telemóvel / WhatsApp',
      email: 'Email',
      website: 'Website',
    },
  },

  whatsapp: {
    cta: 'Enviar mensagem no WhatsApp',
    prefill: 'Olá, gostaria de saber mais sobre a NIEUSYNC',
  },

  schedule: {
    title: 'Prefere agendar directamente?',
    body: 'Escolha o horário que melhor se adequa à sua agenda, que nós confirmamos a disponibilidade o mais rapidamente possível. Reunião presencial, por videochamada ou telefone.',
    cta: 'Agendar no Calendário',
  },

  form: {
    title: 'Agendar consulta de 30 min',
    subtitle: 'Preencha o formulário e entraremos em contacto o mais rápido possível.',
    name: {
      label: 'Nome completo *',
      placeholder: 'O seu nome',
    },
    email: {
      label: 'Email profissional *',
      placeholder: 'email@empresa.pt',
    },
    phone: {
      label: 'Telefone *',
      placeholder: '+351 912 345 678',
    },
    company: {
      label: 'Nome da empresa',
      placeholder: 'A sua empresa',
    },
    sector: {
      label: 'Sector de actividade *',
      placeholder: 'Seleccione o sector',
      options: {
        technology: 'Tecnologia',
        commerce: 'Comércio',
        services: 'Serviços',
        construction: 'Construção',
        agriculture: 'Agro',
        tourism: 'Turismo',
        health: 'Saúde',
        other: 'Outro',
      },
    },
    challenge: {
      label: 'Principal desafio *',
      placeholder: 'Seleccione o desafio principal',
      options: {
        legal: 'Questões legais',
        compliance: 'Compliance e proteção de dados',
        marketing: 'Marketing e crescimento',
        processes: 'Processos e automação',
        unsure: 'Não sei por onde começar',
      },
    },
    message: {
      label: 'Mensagem',
      placeholder: 'Conte-nos mais sobre o seu negócio...',
    },
    consent: {
      before: 'Li e aceito a ',
      privacyLink: 'Política de Privacidade',
      after: ' e autorizo o tratamento dos meus dados para efeitos de contacto.',
    },
    submit: 'Enviar pedido →',
    note: 'Resposta garantida no prazo de 24 horas úteis.',
  },

  success: {
    title: 'Pedido enviado!',
    body: 'Entraremos em contacto o mais rápido possível.',
  },
};

export default contact;
