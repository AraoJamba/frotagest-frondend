import { api } from "./api";

export const getDashboard = async () => {
  const [motoristas, veiculos, viagens, manutencoes] =
    await Promise.all([
      api.get("/motoristas/estatisticas/resumo"),
      api.get("/veiculos/estatisticas/resumo"),
      api.get("/viagens/estatisticas/resumo"),
      api.get("/manutencoes/estatisticas/resumo"),
    ]);

  return {
    motoristas: motoristas.data,
    veiculos: veiculos.data,
    viagens: viagens.data,
    manutencoes: manutencoes.data,
  };
};