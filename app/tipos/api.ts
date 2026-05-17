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