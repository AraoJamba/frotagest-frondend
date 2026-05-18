export interface ViagemAPI {
  id: string;

  data_inicio: string;
  data_fim: string;

  local_partida: string;
  local_destino: string;

  distancia: number;
  status: 'planejada' | 'emAndamento' | 'concluida' | 'cancelada';

  combustivel_gasto: number;
  custo_viagem: number;

  observacoes: string;

  motorista: {
    id: string;
    nome: string;
  };

  veiculo: {
    id: string;
    placa: string;
    marca: string;
    modelo: string;
  };
}

export interface Despesa {
  id: string;
  tipo: 'combustivel' | 'manutencao' | 'seguro' | 'pneu' | 'lavagem' | 'outro';
  valor: number;
  data: string;
  descricao: string;
  veiculo_id?: string;
  motorista_id?: string;
  recibo?: string;
  pago: '0' | '1';

  veiculo: {
    id: string;
    placa: string;
    marca: string;
    modelo: string;
  };
}

export interface Viagem {
  id: string;
  motorista_id: string;
  veiculo_id: string;
  data_inicio: string;
  data_fim?: string;
  local_partida: string;
  local_destino: string;
  distancia: number; // km
  status: 'planejada' | 'emAndamento' | 'concluida' | 'cancelada';
  combustivel_gasto: number;
  custo_viagem: number;
  observacoes?: string;

  motorista?: {
    id: string;
    nome: string;
  };

  veiculo?: {
    id: string,
    placa: string,
    marca: string,
    modelo: string
  }
}

export interface Despesa {
  id: string;
  tipo: 'combustivel' | 'manutencao' | 'seguro' | 'pneu' | 'lavagem' | 'outro';
  valor: number;
  data: string;
  descricao: string;
  veiculo_id?: string;
  motorista_id?: string;
  recibo?: string;
  pago: '0' | '1';

  veiculo?: {
    id: string,
    placa: string,
    marca: string,
    modelo: string
  }
}

export interface PostoCombustivel {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  provincia: string;
  telefone?: string;
  preco_combustivel: number;
  gasoleo: number;
  gasolina: number;
  data_cadastro: string;
  ativo: boolean;
}

export interface Lembrete {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'manutencao' | 'documentacao' | 'revisao' | 'outro';
  data_agendada: string;
  data_criacao?: string;
  completado: boolean;
  veiculo_id?: string;
  motorista_id?: string;
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface ConfiguracoesEmpresa {
  nomeEmpresa: string;
  NIF: string;
  endereco: string;
  telefone: string;
  email: string;
  logoUrl?: string;
}

export interface ConfiguracoesMedidas {
  unidadeDistancia: 'km' | 'mi';
  unidadeConsumoCombustivel: 'kmL' | 'kmgal';
  unidadePeso: 'kg' | 'lb';
  unidadeTemperatura: 'celsius' | 'fahrenheit';
}

export interface ConfiguracoeApp {
  temaEscuro: boolean;
  notificacoesAtivas: boolean;
  emailNotificacoes: boolean;
  whatsappNotificacoes: boolean;
  idioma: 'pt-BR' | 'en' | 'es';
}

export interface DadosAnalises {
  periodoInicio: string;
  periodoFim: string;
  quilometragemTotal: number;
  combustvelTotalGasto: number;
  custosCombustivel: number;
  custosManutencao: number;
  custosTotal: number;
  combustvelMedio: number;
  viagensConcluidas: number;
  viagensCanceladas: number;
}
