import {api} from "./api";

export const listarViagens = async () => {
  const res = await api.get("/viagens");
  return res.data;
};

export const deletarViagemAPI = async (id: string) => {
  await api.delete(`/viagens/${id}`);
};



