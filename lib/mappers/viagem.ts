import { Viagem } from "@/app/tipos/indices";
import { ViagemAPI } from "@/app/tipos/api";

export const mapViagem = (data: ViagemAPI): Viagem => ({
  id: data.id,

  dataInicio: data.data_inicio,
  dataFim: data.data_fim,

  localPartida: data.local_partida,
  localDestino: data.local_destino,

  distancia: data.distancia,
  status: data.status,

  combustivelGasto: data.combustivel_gasto,
  custoViagem: data.custo_viagem,

  observacoes: data.observacoes,

  motoristaId: data.motorista.id,

  veiculoId: data.veiculo.id,

  motorista: data.motorista,

  veiculo: data.veiculo,
});