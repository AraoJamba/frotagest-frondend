// Tipos gerais do sistema

export interface Motorista {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  numeroCarta: string;
  numeroBI: string;
  categoriaCarta: 'A' | 'A1' | 'B' | 'C' | 'C1' | 'EB' | 'EC' | 'EC1';
  dataNascimento: string;
  dataValidadeCarta: string;
  dataCadastro: string;
  ativo: boolean;
  endereco: string;
  cidade: string;
  provincia: string;
}

export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  VIN: string;
  tipo: 'leve' | 'medio' | 'pesado';
  capacidadeCarga: number; // kg
  dataCadastro: string;
  ativo: boolean;
  combustivel: 'gasolina' | 'diesel' | 'etanol';
  consumoMedio: number; // km/l
  ultimaRevista: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'manutencao' | 'reparo' | 'inspecao';
  custo_estimado: number;
  data_cadastro: string;
  ativo: boolean;
}

export interface Viagem {
  id: string;
  motoristaId: string;
  veiculoId: string;
  dataInicio: string;
  dataFim?: string;
  localPartida: string;
  localDestino: string;
  distancia: number; // km
  status: 'planejada' | 'emAndamento' | 'concluida' | 'cancelada';
  combustivelGasto: number;
  custoViagem: number;
  observacoes?: string;
}

export interface ManutencaoVeiculo {
  id: string;
  veiculoId: string;
  tipoManutencao: 'preventiva' | 'corretiva';
  descricao: string;
  dataAgendada: string;
  dataConclusao?: string;
  responsavel: string;
  custo: number;
  status: 'agendada' | 'emAndamento' | 'concluida' | 'cancelada';
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
}

export interface PostoCombustivel {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  provincia: string;
  telefone?: string;
  precoCombustivel: number;
  gasoleo: number;
  gasolina: number;
  dataCadastro: string;
  ativo: boolean;
}

export interface Lembrete {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'manutencao' | 'documentacao' | 'revisao' | 'outro';
  dataAgendada: string;
  dataCriacao?: string;
  completado: boolean;
  veiculoId?: string;
  motoristaId?: string;
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
