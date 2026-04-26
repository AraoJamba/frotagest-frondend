'use client';

import React from "react";
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Card } from '@/components/ui/card';
import { Truck, Users, MapPin, Wrench, ArrowUpRight } from 'lucide-react';

export default function PaginaDashboard() {
  const { usuarioAtual } = useAutenticacao();

  const cartasEstatisticas = [
    { titulo: 'Veículos Ativos', valor: 24, desc: 'Frota em operação', icone: Truck, cor: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { titulo: 'Motoristas', valor: 15, desc: 'Equipe ativa', icone: Users, cor: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { titulo: 'Viagens Ativas', valor: 8, desc: 'Em progresso', icone: MapPin, cor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { titulo: 'Manutenção', valor: 3, desc: 'Serviços pendentes', icone: Wrench, cor: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10 transition-colors duration-500">
      {/* Cabeçalho */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Painel de Controle
          </h1>
          <p className="text-zinc-450 mt-2 font-medium">
            Bem-vindo de volta, <span className="text-white">{usuarioAtual?.nome}</span>.
          </p>
        </div>
        <div className="hidden md:block text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          SISTEMA V2.0.4
        </div>
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cartasEstatisticas.map((carta) => {
          const Icone = carta.icone;
          return (
            <Card key={carta.titulo} className="relative group overflow-hidden border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900 hover:border-zinc-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{carta.titulo}</p>
                  <h3 className="text-3xl font-black mt-1">{carta.valor}</h3>
                </div>
                <div className={`p-2.5 rounded-xl border ${carta.bg} ${carta.cor} ${carta.border}`}>
                  <Icone className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500">{carta.desc}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-700 group-hover:text-primary transition-colors" />
              </div>
              {/* Efeito de luz no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atividades Recentes */}
        <Card className="lg:col-span-2 bg-zinc-900/30 border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold tracking-tight">Fluxo de Atividades</h2>
            <div className="h-1 w-12 bg-zinc-800 rounded-full" />
          </div>
          
          <div className="space-y-3">
            {[
              { label: 'Viagem', info: 'Scania 124 - João Silva', time: '2h', status: 'bg-blue-500' },
              { label: 'Cadastro', info: 'Carlos Eduardo (Motorista)', time: '5h', status: 'bg-purple-500' },
              { label: 'Alerta', info: 'Volvo FH16 - Revisão', time: '1d', status: 'bg-amber-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-zinc-800 transition-all">
                <div className={`w-1.5 h-6 rounded-full ${item.status}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-tighter">{item.info}</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">{item.time} atrás</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Card Informativo Estilizado */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 relative group cursor-help">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-primary mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-black uppercase italic">Dica de Produtividade</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed leading-relaxed">
                Você pode filtrar sua frota por <span className="text-white font-bold">status de manutenção</span> no menu lateral para otimizar os custos.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 transition-all cursor-pointer">
             <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center mb-2">
                <span className="text-xl">+</span>
             </div>
             <span className="text-xs font-bold uppercase tracking-widest">Novo Relatório</span>
          </div>
        </div>
      </div>
    </div>
  );
}





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
