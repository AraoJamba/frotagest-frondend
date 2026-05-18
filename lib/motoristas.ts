import { api } from "./api";

import {Motorista} from "@/app/tipos/indices"

export const mapMotorista = (m: any) => ({
  id: m.id,
  nome: m.nome,
  email: m.email,
  telefone: m.telefone,

  numeroCarta: m.numero_carta,
  numeroBI: m.numero_bi,
  categoriaCarta: m.categoria_carta,

  dataNascimento: m.data_nascimento,
  dataValidadeCarta: m.data_validade_carta,
  dataCadastro: m.data_cadastro,

  ativo: m.ativo,
  endereco: m.endereco,
  cidade: m.cidade,
  provincia: m.provincia,
});


export const atualizarMotorista = async (id: string, data: any) => {
  const res = await api.put(`/motoristas/${id}`, data);
  return res.data;
};


export const obterMotorista = async (id: string) => {
  const res = await api.get(`/motoristas/${id}`);
  return mapMotorista(res.data);
};




export const listarMotoristas = async () => {
  const res = await api.get("/motoristas");
  return res.data.map(mapMotorista);
};


export const deletarMotorista = async (id: string) => {
  const res = await api.delete(`/motoristas/${id}`);
  return res.data;
};


export const criarMotorista = async (data: any) => {
  const payload = {
    nome: data.nome,
    email: data.email,
    telefone: data.telefone ?? "",
    numero_carta: data.numeroCarta,
    numero_bi: data.numeroBI,
    categoria_carta: data.categoriaCarta,

    data_nascimento: data.dataNascimento
      ? new Date(data.dataNascimento).toISOString().split("T")[0]
      : "2000-01-01",

    data_validade_carta: data.dataValidadeCarta
      ? new Date(data.dataValidadeCarta).toISOString().split("T")[0]
      : "2030-01-01",

    data_cadastro: new Date().toISOString().split("T")[0],

    ativo: data.ativo ?? true,
    endereco: data.endereco ?? "",
    cidade: data.cidade ?? "",
    provincia: data.provincia ?? "",
  };

  console.log("PAYLOAD FINAL:", payload); 

  const res = await api.post("/motoristas", payload);
  return res.data;


  console.log("PAYLOAD FINAL:", payload);
};






