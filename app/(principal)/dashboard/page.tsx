"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/lib/dashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Wrench,
  CarFront,
  MapPin,
  UserCheck,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">
            Carregando sistema...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Manutenções",
      icon: <Wrench className="w-5 h-5 text-blue-600" />,
      total: 1,
      status: [
        { label: "Agendadas", value: 1 },
        { label: "Concluídas", value: 0 },
        { label: "Em andamento", value: 0 },
      ],
    },
    {
      title: "Veículos",
      icon: <CarFront className="w-5 h-5 text-emerald-600" />,
      total: 1,
      status: [
        { label: "Ativos", value: 1 },
        { label: "Manutenção", value: 0 },
      ],
    },
    {
      title: "Viagens",
      icon: <MapPin className="w-5 h-5 text-violet-600" />,
      total: 1,
      status: [
        { label: "Em curso", value: 1 },
        { label: "Finalizadas", value: 0 },
      ],
    },
    {
      title: "Motoristas",
      icon: <UserCheck className="w-5 h-5 text-orange-500" />,
      total: 1,
      status: [
        { label: "Disponíveis", value: 1 },
        { label: "Em viagem", value: 0 },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Sistema de Gestão de Frotas
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Controle e monitoramento da frota em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-sm text-slate-600 font-medium">
              Servidor Online
            </span>
          </div>
        </header>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((item, idx) => (
            <Card
              key={idx}
              className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-4">

                <div>
                  <CardTitle className="text-sm font-semibold text-slate-600">
                    {item.title}
                  </CardTitle>
                </div>

                <div className="p-3 rounded-xl bg-slate-100">
                  {item.icon}
                </div>
              </CardHeader>

              <CardContent>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-4xl font-bold text-slate-800">
                    {item.total}
                  </span>

                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="space-y-4">

                  {item.status.map((st, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">

                        <div
                          className={`h-2 w-2 rounded-full ${
                            st.value > 0
                              ? "bg-emerald-500"
                              : "bg-slate-300"
                          }`}
                        />

                        <span className="text-sm text-slate-600">
                          {st.label}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {st.value}
                      </span>
                    </div>
                  ))}

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}













// "use client";

// import { useEffect, useState } from "react";
// import { getDashboard } from "@/lib/dashboard";
// import { Card } from "@/components/ui/card";

// export default function Dashboard() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     getDashboard().then(setData);
//   }, []);

//   if (!data) return <p>Carregando...</p>;

//   return (
//     <>

//       <Card>
//         <h1>Manutencoes</h1>
//         <p>  total: 1 </p>
//         <ul>status
//           <li>agendadas: 1</li>
//           <li>concluidas: 0</li>
//           <li>cancelada: 0</li>
//           <li>emAndamento: 0</li>
//         </ul>

//         <ul>tipos
//           <li>corretiva: 1</li>
//           <li>inspecao: 0</li>
//           <li>preventiva: 0</li>
//           <li>reparo: 0</li>
//         </ul>
//       </Card>

//       <Card>
//         <h1>Veículos</h1>
//         <p>  total: 1 </p>
//         <ul>status
//           <li>agendadas: 1</li>
//           <li>concluidas: 0</li>
//           <li>cancelada: 0</li>
//           <li>emAndamento: 0</li>
//         </ul>

//         <ul>tipos
//           <li>carros: 1</li>
//           <li>caminhoes: 0</li>
//           <li>caminhonente: 0</li>
//           <li>motorizadas: 0</li>
//           <li>autocarros: 0</li>
//           <li>mini autocarros: 0</li>
//         </ul>
//       </Card>

//       <Card>
//         <h1>Viagens</h1>
//         <p>  total: 1 </p>
//         <ul>status
//           <li>agendadas: 1</li>
//           <li>concluidas: 0</li>
//           <li>cancelada: 0</li>
//           <li>emAndamento: 0</li>
//         </ul>
//       </Card>

//       <Card>
//         <h1>Motoristas</h1>
//         <p>  total: 1 </p>
//         <ul>status
//           <li>ativos: 1</li>
//           <li>inaativos: 0</li>
//         </ul>
//       </Card>
//     </>
//   );
// }





// 'use client';

// import React from "react"

// import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// import { Card } from '@/components/ui/card';
// import { Truck, Users, MapPin, Wrench } from 'lucide-react';

// interface CartaEstatistica {
//   titulo: string;
//   valor: string | number;
//   descricao: string;
//   icone: React.ComponentType<{ className?: string }>;
//   cor: string;
// }

// export default function PaginaDashboard() {
//   const { usuarioAtual } = useAutenticacao();

//   const cartasEstatisticas: CartaEstatistica[] = [
//     {
//       titulo: 'Veículos Ativos',
//       valor: 24,
//       descricao: 'Frota em operação',
//       icone: Truck,
//       cor: 'bg-primary/10 text-primary',
//     },
//     {
//       titulo: 'Motoristas',
//       valor: 15,
//       descricao: 'Motoristas cadastrados',
//       icone: Users,
//       cor: 'bg-accent/10 text-accent',
//     },
//     {
//       titulo: 'Viagens Ativas',
//       valor: 8,
//       descricao: 'Viagens em progresso',
//       icone: MapPin,
//       cor: 'bg-chart-2/10 text-chart-2',
//     },
//     {
//       titulo: 'Manutenção Pendente',
//       valor: 3,
//       descricao: 'Serviços agendados',
//       icone: Wrench,
//       cor: 'bg-chart-4/10 text-chart-4',
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* Cabeçalho */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">
//           Bem-vindo, {usuarioAtual?.nome}!
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           Aqui está o resumo geral da sua frota
//         </p>
//       </div>

//       {/* Cartões de Estatísticas */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {cartasEstatisticas.map((carta) => {
//           const Icone = carta.icone;
//           return (
//             <Card key={carta.titulo} className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground">{carta.titulo}</p>
//                   <p className="text-2xl font-bold text-foreground mt-2">{carta.valor}</p>
//                   <p className="text-xs text-muted-foreground mt-2">{carta.descricao}</p>
//                 </div>
//                 <div className={`p-3 rounded-lg ${carta.cor}`}>
//                   <Icone className="w-6 h-6" />
//                 </div>
//               </div>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Seção de Atividades Recentes */}
//       <Card className="p-6">
//         <h2 className="text-xl font-bold text-foreground mb-4">Atividades Recentes</h2>
//         <div className="space-y-4">
//           <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
//             <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-foreground">Viagem iniciada</p>
//               <p className="text-xs text-muted-foreground">Veículo: Scania 124 - Motorista: João Silva</p>
//             </div>
//             <p className="text-xs text-muted-foreground whitespace-nowrap">Há 2 horas</p>
//           </div>
          
//           <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
//             <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-foreground">Novo motorista cadastrado</p>
//               <p className="text-xs text-muted-foreground">Carlos Eduardo - CNH válida</p>
//             </div>
//             <p className="text-xs text-muted-foreground whitespace-nowrap">Há 5 horas</p>
//           </div>

//           <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
//             <div className="w-2 h-2 rounded-full bg-chart-4 flex-shrink-0" />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-foreground">Manutenção agendada</p>
//               <p className="text-xs text-muted-foreground">Veículo: Volvo FH16 - Revisão completa</p>
//             </div>
//             <p className="text-xs text-muted-foreground whitespace-nowrap">Há 1 dia</p>
//           </div>
//         </div>
//       </Card>

//       {/* Dicas */}
//       <Card className="p-6 bg-primary/5 border border-primary/20">
//         <h3 className="font-semibold text-foreground mb-2">Dica de Uso</h3>
//         <p className="text-sm text-foreground/80">
//           Use o menu lateral para acessar todos os módulos do sistema. Dependendo do seu papel de usuário, 
//           alguns itens podem estar restritos. Se tiver dúvidas, acesse a seção de Configurações.
//         </p>
//       </Card>
//     </div>
//   );
// }
