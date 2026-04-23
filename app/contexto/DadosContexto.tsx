'use client';

import { Viagem } from "@/app/tipos/indices"

import { criarMotorista as apiCriarMotorista } from '@/lib/motoristas';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { listarMotoristas, deletarMotorista as apiDeletar } from '@/lib/motoristas';

import { listarViagens, deletarViagemAPI } from "@/lib/viagens";
import { mapViagem } from "@/lib/mappers";




interface Motorista {
  id: string;
  nome: string;
  email: string;
  numeroCarta: string;
  categoriaCarta: string;
  ativo: boolean;
}

interface DadosContextoType {
  motoristas: Motorista[];
  carregarMotoristas: () => Promise<void>;
  deletarMotorista: (id: string) => Promise<void>;
  adicionarMotorista: (motorista: Motorista) => Promise<void>; // 👈 ADICIONA ISSO
  viagens: Viagem[];
  carregarViagens: () => Promise<void>;
  setViagens: React.Dispatch<React.SetStateAction<Viagem[]>>;
  deletarViagem: (id: string) => Promise<void> | void;
}


//const DadosContexto = createContext<DadosContextoType | undefined>(undefined);
export const DadosContexto = createContext<DadosContextoType | undefined>(undefined);


export function Provedor_Dados({ children }: { children: React.ReactNode }) {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [viagens, setViagens] = useState<Viagem[]>([]);

  const [loadingViagens, setLoadingViagens] = useState(false);
  const [erroViagens, setErroViagens] = useState<string | null>(null);


  const carregarMotoristas = async () => {
    const data = await listarMotoristas();
    setMotoristas(data);
  };

  const deletarMotorista = async (id: string) => {
    await apiDeletar(id);
    setMotoristas((prev) => prev.filter((m) => m.id !== id));
  };

  const adicionarMotorista = async (motorista: Motorista) => {
    const novo = await apiCriarMotorista(motorista);

    setMotoristas((prev) => [...prev, novo]);
  };


  const carregarViagens = async () => {
    const res = await listarViagens();
    setViagens(res.map(mapViagem));
  };


  const deletarViagem = async (id: string) => {
    await deletarViagemAPI(id);

    setViagens((prev) => prev.filter((v) => v.id !== id));
  };




  useEffect(() => {
    carregarMotoristas();
    carregarViagens();
  }, []);

  return (
    <DadosContexto.Provider value={{
      motoristas,
      carregarMotoristas,
      deletarMotorista,
      adicionarMotorista, // 👈 IMPORTANTE

      viagens,
      setViagens,
      deletarViagem,
      carregarViagens,
    }}>

      {children}
    </DadosContexto.Provider>
  );
}

export function useDados() {
  const context = useContext(DadosContexto);
  if (!context) {
    throw new Error('useDados deve ser usado dentro do Provedor_Dados');
  }
  return context;
}



/* 'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
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

interface DadosContextoType {
  // Motoristas
  motoristas: Motorista[];
  adicionarMotorista: (motorista: Motorista) => void;
  atualizarMotorista: (id: string, motorista: Partial<Motorista>) => void;
  deletarMotorista: (id: string) => void;
  obterMotorista: (id: string) => Motorista | undefined;

  // Veículos
  veiculos: Veiculo[];
  adicionarVeiculo: (veiculo: Veiculo) => void;
  atualizarVeiculo: (id: string, veiculo: Partial<Veiculo>) => void;
  deletarVeiculo: (id: string) => void;
  obterVeiculo: (id: string) => Veiculo | undefined;

  // Serviços
  servicos: Servico[];
  adicionarServico: (servico: Servico) => void;
  atualizarServico: (id: string, servico: Partial<Servico>) => void;
  deletarServico: (id: string) => void;
  obterServico: (id: string) => Servico | undefined;

  // Viagens
  viagens: Viagem[];
  adicionarViagem: (viagem: Viagem) => void;
  atualizarViagem: (id: string, viagem: Partial<Viagem>) => void;
  deletarViagem: (id: string) => void;
  obterViagem: (id: string) => Viagem | undefined;

  // Manutenção
  manutencoes: ManutencaoVeiculo[];
  adicionarManutencao: (manutencao: ManutencaoVeiculo) => void;
  atualizarManutencao: (id: string, manutencao: Partial<ManutencaoVeiculo>) => void;
  deletarManutencao: (id: string) => void;

  // Despesas
  despesas: Despesa[];
  adicionarDespesa: (despesa: Despesa) => void;
  atualizarDespesa: (id: string, despesa: Partial<Despesa>) => void;
  deletarDespesa: (id: string) => void;
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

// Dados iniciais de exemplo
const motoristasIniciais: Motorista[] = [
  {
    id: '1',
    nome: 'Antónia José',
    email: 'ajose@frotagest.com',
    telefone: '920987345',
    numeroCarta: '123456789',
    dataValidadeCarta: '2026-10-10',
    categoriaCarta: 'EB',
    dataNascimento: '1990-01-15',
    dataCadastro: '2024-01-01',
    ativo: true,
    endereco: 'Rua A, 100',
    cidade: 'Panguila',
    provincia: 'Bengo',
    numeroBI: '',
  },
  {
    id: '2',
    nome: 'Arão Jamba',
    email: 'maria@frotagest.com',
    telefone: '927636677',
    numeroCarta: '987654321',
    categoriaCarta: 'A1',
    dataValidadeCarta: '2026-10-10',
    dataNascimento: '1985-05-20',
    dataCadastro: '2024-01-05',
    ativo: true,
    endereco: 'Rua beto Carneiro, 200',
    cidade: 'Viana',
    provincia: 'Luanda',
    numeroBI: '',
  },
];

const viagensIniciais: Viagem[] = [
  {
    id: '1',
    motoristaId: '1',
    veiculoId: '1',
    dataInicio: '2026-02-14',
    dataFim: '2026-02-16',
    localPartida: 'Benguela',
    localDestino: 'Huambo',
    distancia: 3, // km
    status: 'planejada',
    combustivelGasto: 0,
    custoViagem: 0,
    observacoes: '',
  },
  {
    id: '2',
    motoristaId: '2',
    veiculoId: '2',
    dataInicio: '2026-01-14',
    dataFim: '2026-02-01',
    localPartida: 'Luanda',
    localDestino: 'Malanje',
    distancia: 3, // km
    status: 'concluida',
    combustivelGasto: 1000,
    custoViagem: 0,
    observacoes: 'feita',
  },

    {
    id: '3',
    motoristaId: '2',
    veiculoId: '2',
    dataInicio: '2026-01-14',
    dataFim: undefined,
    localPartida: 'Luanda',
    localDestino: 'Malanje',
    distancia: 3, // km
    status: 'concluida',
    combustivelGasto: 1000,
    custoViagem: 0,
    observacoes: 'feita',
  },
];

const veiculosIniciais: Veiculo[] = [
  {
    id: '1',
    placa: 'LD-12-89-YZ',
    modelo: 'Scania 124',
    marca: 'Scania',
    ano: 2020,
    VIN: 'XY123456789',
    tipo: 'pesado',
    capacidadeCarga: 20000,
    dataCadastro: '2024-01-01',
    ativo: true,
    combustivel: 'diesel',
    consumoMedio: 5.5,
    ultimaRevista: '2024-01-15',
  },
  {
    id: '2',
    placa: 'LD-34-67-WX',
    modelo: 'Volvo FH16',
    marca: 'Volvo',
    ano: 2019,
    VIN: 'AB987654321',
    tipo: 'pesado',
    capacidadeCarga: 18000,
    dataCadastro: '2024-01-02',
    ativo: true,
    combustivel: 'diesel',
    consumoMedio: 5.2,
    ultimaRevista: '2024-01-10',
  },
];

const despesasIniciais: Despesa[] = [
  {
    id: '1',
    data: '2022-01-20',
    descricao: '',
    pago: '0',
    tipo: 'combustivel',
    valor: 10000,
    veiculoId: '1',
    motoristaId: '1',
    recibo: '123456789',
  },
]

const servicosIniciais: Servico[] = [
  {
    id: '1',
    nome: 'Troca de Óleo',
    descricao: 'Troca de óleo do motor',
    tipo: 'manutencao',
    custoEstimado: 150,
    dataCadastro: '2024-01-01',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Revisão Completa',
    descricao: 'Revisão completa do veículo',
    tipo: 'inspecao',
    custoEstimado: 500,
    dataCadastro: '2024-01-01',
    ativo: true,
  },
    {
    id: '3',
    nome: 'Revisão Completa',
    descricao: 'Revisão completa do veículo',
    tipo: 'inspecao',
    custoEstimado: 10000,
    dataCadastro: '2024-01-01',
    ativo: true,
  },
    {
    id: '4',
    nome: 'Revisão Completa',
    descricao: 'Revisão completa do veículo',
    tipo: 'inspecao',
    custoEstimado: 1000000,
    dataCadastro: '2024-01-01',
    ativo: true,
  },
];

const lembretesIniciais: Lembrete[] = [
  {
    id: '1',
    titulo: 'Revisao do carro',
    descricao: 'Revisao do carro',
    tipo: 'revisao',
    dataAgendada: '2026-03-01',
    dataCriacao: '2026-02-20',
    completado: 'Não',
    veiculoId: '1',
    motoristaId: '1',
    prioridade: 'media',
  },
  {
    id: '2',
    titulo: 'Comprar moto',
    descricao: 'Comprar motor do carro',
    tipo: 'outro',
    dataAgendada: '2026-04-01',
    dataCriacao: '2026-02-24',
    completado: 'Sim',
    veiculoId: '2',
    motoristaId: '2',
    prioridade: 'alta',
  },
];

const postosCombustivelIniciais: PostoCombustivel[] = [
  {
    id: '1',
    nome: 'Pumangol',
    endereco: 'Viana, Luanda, Angola',
    cidade: 'Viana',
    provincia: 'Luanda',
    telefone: '9229339111',
    precoCombustivel: 300,
    gasoleo: 300,
    gasolina: 300,
    dataCadastro: '2025-31-12',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Sonangol',
    endereco: 'Boavista, estrada Nº100',
    cidade: 'Ingombotas',
    provincia: 'Luanda',
    telefone: '9229339111',
    precoCombustivel: 300,
    gasoleo: 300,
    gasolina: 300,
    dataCadastro: '2026-31-12',
    ativo: true,
  },
];

export function Provedor_Dados({ children }: { children: ReactNode }) {
  const [motoristas, setMotoristas] = useState<Motorista[]>(motoristasIniciais);
  const [veiculos, setVeiculos] = useState<Veiculo[]>(veiculosIniciais);
  const [servicos, setServicos] = useState<Servico[]>(servicosIniciais);
  const [viagens, setViagens] = useState<Viagem[]>((viagensIniciais));
  const [manutencoes, setManutencoes] = useState<ManutencaoVeiculo[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>(despesasIniciais);
  const [postosCombustivel, setPostosCombustivel] = useState<PostoCombustivel[]>(postosCombustivelIniciais);
  const [lembretes, setLembretes] = useState<Lembrete[]>(lembretesIniciais);

  // Motoristas
  const adicionarMotorista = (motorista: Motorista) => {
    setMotoristas([...motoristas, motorista]);
  };

  const atualizarMotorista = (id: string, atualizacoes: Partial<Motorista>) => {
    setMotoristas(motoristas.map(m => m.id === id ? { ...m, ...atualizacoes } : m));
  };

  const deletarMotorista = (id: string) => {
    setMotoristas(motoristas.filter(m => m.id !== id));
  };

  const obterMotorista = (id: string) => {
    return motoristas.find(m => m.id === id);
  };

  // Veículos
  const adicionarVeiculo = (veiculo: Veiculo) => {
    setVeiculos([...veiculos, veiculo]);
  };

  const atualizarVeiculo = (id: string, atualizacoes: Partial<Veiculo>) => {
    setVeiculos(veiculos.map(v => v.id === id ? { ...v, ...atualizacoes } : v));
  };

  const deletarVeiculo = (id: string) => {
    setVeiculos(veiculos.filter(v => v.id !== id));
  };

  const obterVeiculo = (id: string) => {
    return veiculos.find(v => v.id === id);
  };

  // Serviços
  const adicionarServico = (servico: Servico) => {
    setServicos([...servicos, servico]);
  };

  const atualizarServico = (id: string, atualizacoes: Partial<Servico>) => {
    setServicos(servicos.map(s => s.id === id ? { ...s, ...atualizacoes } : s));
  };

  const deletarServico = (id: string) => {
    setServicos(servicos.filter(s => s.id !== id));
  };

  const obterServico = (id: string) => {
    return servicos.find(s => s.id === id);
  };

  // Viagens
  const adicionarViagem = (viagem: Viagem) => {
    setViagens([...viagens, viagem]);
  };

  const atualizarViagem = (id: string, atualizacoes: Partial<Viagem>) => {
    setViagens(viagens.map(v => v.id === id ? { ...v, ...atualizacoes } : v));
  };

  const deletarViagem = (id: string) => {
    setViagens(viagens.filter(v => v.id !== id));
  };

  const obterViagem = (id: string) => {
    return viagens.find(v => v.id === id);
  };

  // Manutenção
  const adicionarManutencao = (manutencao: ManutencaoVeiculo) => {
    setManutencoes([...manutencoes, manutencao]);
  };

  const atualizarManutencao = (id: string, atualizacoes: Partial<ManutencaoVeiculo>) => {
    setManutencoes(manutencoes.map(m => m.id === id ? { ...m, ...atualizacoes } : m));
  };

  const deletarManutencao = (id: string) => {
    setManutencoes(manutencoes.filter(m => m.id !== id));
  };

  // Despesas
  const adicionarDespesa = (despesa: Despesa) => {
    setDespesas([...despesas, despesa]);
  };

  const atualizarDespesa = (id: string, atualizacoes: Partial<Despesa>) => {
    setDespesas(despesas.map(d => d.id === id ? { ...d, ...atualizacoes } : d));
  };

  const deletarDespesa = (id: string) => {
    setDespesas(despesas.filter(d => d.id !== id));
  };

  const obterDespesa = (id: string) => {
    return despesas.find(d => d.id === id);
  };

  // Postos de Combustível
  const adicionarPostoCombustivel = (posto: PostoCombustivel) => {
    setPostosCombustivel([...postosCombustivel, posto]);
  };

  const atualizarPostoCombustivel = (id: string, atualizacoes: Partial<PostoCombustivel>) => {
    setPostosCombustivel(postosCombustivel.map(p => p.id === id ? { ...p, ...atualizacoes } : p));
  };

  const deletarPostoCombustivel = (id: string) => {
    setPostosCombustivel(postosCombustivel.filter(p => p.id !== id));
  };

  const obterPostoCombustivel = (id: string) => {
    return postosCombustivel.find(p => p.id === id);
  };

  // Lembretes
  const adicionarLembrete = (lembrete: Lembrete) => {
    setLembretes([...lembretes, lembrete]);
  };

  const atualizarLembrete = (id: string, atualizacoes: Partial<Lembrete>) => {
    setLembretes(lembretes.map(l => l.id === id ? { ...l, ...atualizacoes } : l));
  };

  const deletarLembrete = (id: string) => {
    setLembretes(lembretes.filter(l => l.id !== id));
  };

  const obterLembrete = (id: string) => {
    return lembretes.find(l => l.id === id);
  };

  return (
    <DadosContexto.Provider
      value={{
        motoristas,
        adicionarMotorista,
        atualizarMotorista,
        deletarMotorista,
        obterMotorista,
        veiculos,
        adicionarVeiculo,
        atualizarVeiculo,
        deletarVeiculo,
        obterVeiculo,
        servicos,
        adicionarServico,
        atualizarServico,
        deletarServico,
        obterServico,
        viagens,
        adicionarViagem,
        atualizarViagem,
        deletarViagem,
        obterViagem,
        manutencoes,
        adicionarManutencao,
        atualizarManutencao,
        deletarManutencao,
        despesas,
        adicionarDespesa,
        atualizarDespesa,
        deletarDespesa,
        obterDespesa,
        postosCombustivel,
        adicionarPostoCombustivel,
        atualizarPostoCombustivel,
        deletarPostoCombustivel,
        obterPostoCombustivel,
        lembretes,
        adicionarLembrete,
        atualizarLembrete,
        deletarLembrete,
        obterLembrete,
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

*/