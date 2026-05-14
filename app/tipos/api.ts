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