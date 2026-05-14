import {api} from "./api";

export const listarViagens = async () => {
  const res = await api.get("/viagens");
  return res.data;
};

export const deletarViagemAPI = async (id: string) => {
  await api.delete(`/viagens/${id}`);
};





export const getViagemById = async (id: string) => {
  const { data } = await api.get(`/viagens/${id}`);
  return data;
};

export const mapViagem = (data: any) => ({
  id: data.id,
  localPartida: data.local_partida,
  localDestino: data.local_destino,
  dataInicio: data.data_inicio,
  dataFim: data.data_fim,
  motoristaId: data.motoristaId,
  veiculoId: data.veiculoId,
  distancia: data.distancia,
  status: data.status,
  combustivelGasto: data.combustivelGasto,
  custoViagem: data.custoViagem,
});