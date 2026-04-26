'use client';


import {
  Motorista,
  Veiculo,
  Servico,
  Viagem,
  ManutencaoVeiculo,
  Despesa,
  PostoCombustivel,
  Lembrete,
} from '@/app/tipos/indices';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { mapearServicoParaFrontend, ServicoBackend } from '@/lib/mappers';



interface DadosContextoType {

  // Motoristas
  carregarMotoristas: () => Promise<void>;

  // Veículos
  carregarVeiculos: () => Promise<void>;

  // Viagens
  carregarViagens: () => Promise<void>;

  carregarDespesas: () => Promise<void>;

  carregarPostoCombustivel: () => Promise<void>
  carregarLembretes: () => Promise<void>
  carregarManutencoes: () => Promise<void>
  carregarServicos: () => Promise<void>


  // Motoristas
  motoristas: Motorista[];
  adicionarMotorista: (motorista: Motorista) => Promise<void>;
  atualizarMotorista: (id: string, motorista: Partial<Motorista>) => Promise<void>;
  deletarMotorista: (id: string) => Promise<void>;

  obterMotorista: (id: string) => Motorista | undefined;

  // Veículos
  veiculos: Veiculo[];
  adicionarVeiculo: (veiculo: Veiculo) => Promise<void>;
  atualizarVeiculo: (id: string, veiculo: Partial<Veiculo>) => Promise<void>;
  deletarVeiculo: (id: string) => Promise<void>;

  obterVeiculo: (id: string) => Veiculo | undefined;

  // Serviços
  servicos: Servico[];
  adicionarServico: (servico: Servico) => void;
  atualizarServico: (id: string, servico: Partial<Servico>) => void;
  deletarServico: (id: string) => void;
  obterServico: (id: string) => Servico | undefined;

  // Viagens
  viagens: Viagem[];
  adicionarViagem: (viagem: Viagem) => Promise<void>;
  atualizarViagem: (id: string, viagem: Partial<Viagem>) => Promise<void>;
  deletarViagem: (id: string) => Promise<void>;

  obterViagem: (id: string) => Viagem | undefined;

  // Manutenção
  manutencoes: ManutencaoVeiculo[];
  adicionarManutencao: (manutencao: ManutencaoVeiculo) => void;
  atualizarManutencao: (id: string, manutencao: Partial<ManutencaoVeiculo>) => void;
  deletarManutencao: (id: string) => void;
  obterManutencao: (id: string) => ManutencaoVeiculo | undefined;

  // Despesas
  despesas: Despesa[];
  adicionarDespesa: (despesa: Despesa) => Promise<void>;
  atualizarDespesa: (id: string, despesa: Partial<Despesa>) => Promise<void>;
  deletarDespesa: (id: string) => Promise<void>;

  obterDespesa: (id: string) => Despesa | undefined;

  // Postos de Combustível
  postosCombustivel: PostoCombustivel[];
  adicionarPostoCombustivel: (posto: PostoCombustivel) => void;
  atualizarPostoCombustivel: (id: string, posto: Partial<PostoCombustivel>) => void;
  deletarPostoCombustivel: (id: string) => void;
  obterPostoCombustivel: (id: string) => PostoCombustivel | undefined;

  // Lembretes
  lembretes: Lembrete[];
  adicionarLembrete: (lembrete: Lembrete) => void;
  atualizarLembrete: (id: string, lembrete: Partial<Lembrete>) => void;
  deletarLembrete: (id: string) => void;
  obterLembrete: (id: string) => Lembrete | undefined;
}

export const DadosContexto = createContext<DadosContextoType | undefined>(undefined);



export function Provedor_Dados({ children }: { children: ReactNode }) {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [manutencoes, setManutencoes] = useState<ManutencaoVeiculo[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [postosCombustivel, setPostosCombustivel] = useState<PostoCombustivel[]>([]);
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);



  // Motoristas
  const adicionarMotorista = async (motorista: Motorista) => {
    const res = await api.post('/motoristas', motorista);
    setMotoristas(prev => [...prev, res.data]);
  };

  const atualizarMotorista = async (id: string, dados: Partial<Motorista>) => {
    const res = await api.put(`/motoristas/${id}`, dados);
    setMotoristas(prev => prev.map(m => m.id === id ? res.data : m));
  };

  const deletarMotorista = async (id: string) => {
    await api.delete(`/motoristas/${id}`);
    setMotoristas(prev => prev.filter(m => m.id !== id));
  };

  const carregarMotoristas = async () => {
    const res = await api.get('/motoristas');
    setMotoristas(res.data);
  };

  const obterMotorista = (id: string) => motoristas.find(m => m.id === id);


  // Veículos
  const adicionarVeiculo = async (veiculo: Veiculo) => {
    const res = await api.post('/veiculos', veiculo);
    setVeiculos(prev => [...prev, res.data]);
  };

  const atualizarVeiculo = async (id: string, dados: Partial<Veiculo>) => {
    const res = await api.put(`/veiculos/${id}`, dados);
    setVeiculos(prev => prev.map(v => v.id === id ? res.data : v));
  };

  const deletarVeiculo = async (id: string) => {
    await api.delete(`/veiculos/${id}`);
    setVeiculos(prev => prev.filter(v => v.id !== id));
  };

  const carregarVeiculos = async () => {
    const res = await api.get('/veiculos');
    setVeiculos(res.data);
  };

  const obterVeiculo = (id: string) => veiculos.find(v => v.id === id);


  // Serviços
  // const adicionarServico = (servico: Servico) => {
  //   setServicos([...servicos, servico]);
  // };

  // const atualizarServico = (id: string, atualizacoes: Partial<Servico>) => {
  //   setServicos(servicos.map(s => s.id === id ? { ...s, ...atualizacoes } : s));
  // };

  // const deletarServico = (id: string) => {
  //   setServicos(servicos.filter(s => s.id !== id));
  // };

  // const obterServico = (id: string) => {
  //   return servicos.find(s => s.id === id);
  // };

  const adicionarServico = async (servico: Servico) => {
    const res = await api.post('/servicos', servico);
    setServicos(prev => [...prev, res.data]);
  };

  const atualizarServico = async (id: string, dados: Partial<Servico>) => {
    const res = await api.put(`/servicos/${id}`, dados);
    setServicos(prev => prev.map(s => s.id === id ? res.data : s));
  };

  const deletarServico = async (id: string) => {
    await api.delete(`/servicos/${id}`);
    setServicos(prev => prev.filter(s => s.id !== id));
  };

  const obterServico = (id: string) => servicos.find(s => s.id === id);

  const carregarServicos = async () => {
    const res = await api.get('/servicos');
    setServicos(res.data);
    {console.log(res.data)}
  };

  // Exemplo adaptado da lógica de 'verificarUsuario' nas fontes [1]



  // Viagens
  const adicionarViagem = async (viagem: Viagem) => {
    const res = await api.post('/viagens', viagem);
    setViagens(prev => [...prev, res.data]);
  };

  const atualizarViagem = async (id: string, dados: Partial<Viagem>) => {
    const res = await api.put(`/viagens/${id}`, dados);
    setViagens(prev => prev.map(v => v.id === id ? res.data : v));
  };

  const deletarViagem = async (id: string) => {
    await api.delete(`/viagens/${id}`);
    setViagens(prev => prev.filter(v => v.id !== id));
  };

  const obterViagem = (id: string) => viagens.find(v => v.id === id);

  const carregarViagens = async () => {
    const res = await api.get('/viagens');
    setViagens(res.data);
  };









  // Manutenção
  // const adicionarManutencao = (manutencao: ManutencaoVeiculo) => {
  //   setManutencoes([...manutencoes, manutencao]);
  // };

  // const atualizarManutencao = (id: string, atualizacoes: Partial<ManutencaoVeiculo>) => {
  //   setManutencoes(manutencoes.map(m => m.id === id ? { ...m, ...atualizacoes } : m));
  // };

  // const deletarManutencao = (id: string) => {
  //   setManutencoes(manutencoes.filter(m => m.id !== id));
  // };

    const adicionarManutencao = async (manutencao: ManutencaoVeiculo) => {
    const res = await api.post('/manutencoes', manutencao);
    setManutencoes(prev => [...prev, res.data]);
  };

  const atualizarManutencao = async (id: string, dados: Partial<ManutencaoVeiculo>) => {
    const res = await api.put(`/manutencoes/${id}`, dados);
    setManutencoes(prev => prev.map(m => m.id === id ? res.data : m));
  };

  const deletarManutencao = async (id: string) => {
    await api.delete(`/manutencoes/${id}`);
    setManutencoes(prev => prev.filter(m => m.id !== id));
  };

  const carregarManutencoes = async () => {
    const res = await api.get('/manutencoes');
    setManutencoes(res.data);
  };

  const obterManutencao = (id: string) => manutencoes.find(m => m.id === id);


  // Despesas
  const adicionarDespesa = async (despesa: Despesa) => {
    const res = await api.post('/despesas', despesa);
    setDespesas(prev => [...prev, res.data]);
  };

  const atualizarDespesa = async (id: string, dados: Partial<Despesa>) => {
    const res = await api.put(`/despesas/${id}`, dados);
    setDespesas(prev => prev.map(d => d.id === id ? res.data : d));
  };

  const deletarDespesa = async (id: string) => {
    await api.delete(`/despesas/${id}`);
    setDespesas(prev => prev.filter(d => d.id !== id));
  };

  const carregarDespesas = async () => {
    const res = await api.get('/despesas');
    setDespesas(res.data);
  };

  const obterDespesa = (id: string) => despesas.find(d => d.id === id);

  // Postos de Combustível

  const adicionarPostoCombustivel = async (posto: PostoCombustivel) => {
    const res = await api.post('/postos', posto);
    setPostosCombustivel(prev => [...prev, res.data]);
  };

  const atualizarPostoCombustivel = async (id: string, dados: Partial<PostoCombustivel>) => {
    const res = await api.put(`/postos/${id}`, dados);
    setPostosCombustivel(prev => prev.map(p => p.id === id ? res.data : p));
  };

  const deletarPostoCombustivel = async (id: string) => {
    await api.delete(`/postos/${id}`);
    setPostosCombustivel(prev => prev.filter(p => p.id !== id));
  };

  const carregarPostoCombustivel = async () => {
    const res = await api.get('/postos');
    setPostosCombustivel(res.data);
  };

  const obterPostoCombustivel = (id: string) => postosCombustivel.find(p => p.id === id);

  // Lembretes
  const adicionarLembrete = async (lembrete: Lembrete) => {
    const res = await api.post('/lembretes', lembrete);
    setLembretes(prev => [...prev, res.data]);
  };

  const atualizarLembrete = async (id: string, dados: Partial<Lembrete>) => {
    const res = await api.put(`/lembretes/${id}`, dados);
    setLembretes(prev => prev.map(l => l.id === id ? res.data : l));
  };

  const deletarLembrete = async (id: string) => {
    await api.delete(`/lembretes/${id}`);
    setLembretes(prev => prev.filter(l => l.id !== id));
  };

  const carregarLembretes = async () => {
    const res = await api.get('/lembretes');
    setLembretes(res.data);
  };

  const obterLembrete = (id: string) => lembretes.find(l => l.id === id);





  return (
    <DadosContexto.Provider
      value={{
        motoristas,
        carregarMotoristas,
        adicionarMotorista,
        atualizarMotorista,
        deletarMotorista,
        obterMotorista,

        veiculos,
        carregarVeiculos,
        adicionarVeiculo,
        atualizarVeiculo,
        deletarVeiculo,
        obterVeiculo,

        servicos,
        adicionarServico,
        atualizarServico,
        deletarServico,
        carregarServicos,
        obterServico,

        viagens,
        carregarViagens,
        adicionarViagem,
        atualizarViagem,
        deletarViagem,
        obterViagem,

        manutencoes,
        adicionarManutencao,
        atualizarManutencao,
        deletarManutencao,
        carregarManutencoes,
        obterManutencao,

        despesas,
        adicionarDespesa,
        atualizarDespesa,
        deletarDespesa,
        obterDespesa,
        carregarDespesas,

        postosCombustivel,
        adicionarPostoCombustivel,
        atualizarPostoCombustivel,
        deletarPostoCombustivel,
        carregarPostoCombustivel,
        obterPostoCombustivel,

        lembretes,
        adicionarLembrete,
        atualizarLembrete,
        deletarLembrete,
        obterLembrete,
        carregarLembretes,
      }}
    >
      {children}
    </DadosContexto.Provider>
  );
}

export function useDados() {
  const contexto = useContext(DadosContexto);
  if (!contexto) {
    throw new Error('useDados deve ser usado dentro de Provedor_Dados');
  }
  return contexto;
}
