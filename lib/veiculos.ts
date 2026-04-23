import { api } from "@/lib/api";

// 🔥 LISTAR
export const listarVeiculos = async () => {
  const res = await api.get("/veiculos");
  return res.data;
};

// 🔥 DELETE
export const deletarVeiculo = async (id: string) => {
  const res = await api.delete(`/veiculos/${id}`);
  return res.data;
};


// CREATE
export const criarVeiculo = async (data: any) => {
  const res = await api.post("/veiculos", data);
  return res.data;
};



// GET BY ID
export const obterVeiculo = async (id: string) => {
  const res = await api.get(`/veiculos/${id}`);
  return res.data;
};

// UPDATE
export const atualizarVeiculo = async (id: string, data: any) => {
  const res = await api.put(`/veiculos/${id}`, data);
  return res.data;
};


// DELETE
// export const deletarVeiculo = async (id: string) => {
//   const res = await api.delete(`/veiculos/${id}`);
//   return res.data;
// };



