// ── Tipos do Portal de Clientes NIEUSYNC ──────────────────────
// Espelham as tabelas criadas no Supabase. Editar aqui ao alterar
// o schema em src/lib/supabase.ts ou nas migrações.

export type EstadoPacote = 'ativo' | 'expirado' | 'pendente';
export type EstadoFatura = 'paga' | 'pendente';
export type EstadoDocumento = 'pendente' | 'em_analise' | 'aprovado';
export type EnviadoPor = 'cliente' | 'admin';
export type EstadoConsulta = 'agendada' | 'concluida' | 'cancelada';

export const CATEGORIAS_DOCUMENTOS = [
  'Direito Empresarial',
  'Gestão Estratégica',
  'Marketing Digital',
  'Tecnologias de Informação',
  'Compliance',
] as const;
export type CategoriaDocumento = (typeof CATEGORIAS_DOCUMENTOS)[number];

export interface Profile {
  id: string;
  empresa_nome: string;
  nif: string;
  telefone: string;
  email: string;
  cancelamento_pedido: boolean;
  created_at: string;
}

export interface Pacote {
  id: string;
  profile_id: string;
  nome_pacote: string;
  estado: EstadoPacote;
  data_inicio: string | null;
  data_fim: string | null;
  valor: number | null;
  created_at: string;
}

export interface Fatura {
  id: string;
  profile_id: string;
  pacote_id: string | null;
  numero_fatura: string;
  valor: number | null;
  data_emissao: string | null;
  ficheiro_url: string;
  estado: EstadoFatura;
  created_at: string;
}

export interface Documento {
  id: string;
  profile_id: string;
  nome_ficheiro: string;
  categoria: CategoriaDocumento;
  estado: EstadoDocumento;
  ficheiro_url: string;
  enviado_por: EnviadoPor;
  created_at: string;
}

export interface Consulta {
  id: string;
  profile_id: string;
  data_hora: string;
  estado: EstadoConsulta;
  notas: string;
  created_at: string;
}
