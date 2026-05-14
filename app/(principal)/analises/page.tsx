"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { formatarNumeros, formatarMoeda } from "@/app/funcoes/funcoes";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Fuel, Gauge, Navigation } from "lucide-react";

const CORES = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function PaginaAnalises() {
  const [dadosCustos, setDadosCustos] = useState<any[]>([]);
  const [dadosKm, setDadosKm] = useState<any[]>([]);
  const [custoTotal, setCustoTotal] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resDespesas = await fetch("http://localhost:8000/despesas/analises/resumo");
        const despesas = await resDespesas.json();

        const resViagens = await fetch("http://localhost:8000/viagens/analises/resumo");
        const viagens = await resViagens.json();

        setDadosCustos(despesas);
        setDadosKm(viagens);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDados();
  }, []);

  // calcular custo total corretamente
  useEffect(() => {
    const total = dadosCustos.reduce((acc, curr) => 
      acc +
      (curr.combustivel || 0) +
      (curr.manutencao || 0) +
      (curr.pneu || 0) +
      (curr.lavagem || 0) +
      (curr.outro || 0)
    , 0);

    setCustoTotal(total);
  }, [dadosCustos]);

  // tooltip custom
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-slate-100 font-bold mb-1">{label}</p>
          {payload.map((item: any, i: number) => (
            <p key={i} className="text-xs" style={{ color: item.color || item.fill }}>
              {item.name}: {formatarMoeda(item.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // pie dinâmica (baseado nos custos reais)
  const dadosCustosPie = [
    { name: 'Combustível', value:  Math.round(custoTotal) ? Math.round((dadosCustos.reduce((a,c)=>a+(c.combustivel||0),0)/custoTotal)*100) : 0 },
    { name: 'Manutenção', value: Math.round(custoTotal) ? Math.round((dadosCustos.reduce((a,c)=>a+(c.manutencao||0),0)/custoTotal)*100) : 0 },
    { name: 'Pneus', value: Math.round(custoTotal) ? Math.round((dadosCustos.reduce((a,c)=>a+(c.pneu||0),0)/custoTotal)*100) : 0 },
    { name: 'Lavagem', value: Math.round(custoTotal) ? Math.round((dadosCustos.reduce((a,c)=>a+(c.lavagem||0),0)/custoTotal)*100) : 0 },
    { name: 'Outros', value: Math.round(custoTotal) ? Math.round((dadosCustos.reduce((a,c)=>a+(c.outro||0),0)/custoTotal)*100) : 0 },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-100 p-6 lg:p-10 space-y-10">
      
      {/* Cabeçalho */}
      <header>
        <h1 className="text-2xl font tracking-tight text-white">
          Análises e Relatórios
        </h1>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Quilometragem" value={`${formatarNumeros(dadosKm.reduce((a,c)=>a+(c.quilometragem||0),0))} km`} sub="Últimos meses" icon={<Gauge className="w-5 h-5 text-blue-400" />} />
        
        <MetricCard title="Custo Total" value={formatarMoeda(custoTotal)} sub="Operação completa" icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} />
        
        <MetricCard title="Consumo Médio" value="-- km/L" sub="Baseado nas viagens" icon={<Fuel className="w-5 h-5 text-amber-400" />} />
        
        <MetricCard title="Viagens" value={dadosKm.length} sub="Registros mensais" icon={<Navigation className="w-5 h-5 text-purple-400" />} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Custos */}
        <Card className="bg-white border-white/5 p-6 shadow-2xl">
          <h2 className="text-lg mb-6">Fluxo de Custos Mensal</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dadosCustos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="combustivel" stackId="a" fill="#3b82f6" />
              <Bar dataKey="manutencao" stackId="a" fill="#10b981" />
              <Bar dataKey="pneu" stackId="a" fill="#f59e0b" />
              <Bar dataKey="lavagem" stackId="a" fill="#ef4444" />
              <Bar dataKey="outro" stackId="a" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Km */}
        <Card className="bg-white border-white/5 p-6 shadow-2xl">
          <h2 className="text-lg mb-6">Tendência de Rodagem</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={dadosKm}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="quilometragem" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pie */}
      <Card className="bg-white border-white/5 p-8 shadow-2xl">
        <h2 className="text-xl mb-6">Composição de Gastos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dadosCustosPie} dataKey="value" innerRadius={80} outerRadius={110}>
              {dadosCustosPie.map((_, i) => (
                <Cell key={i} fill={CORES[i % CORES.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        //             <div className="space-y-3">
        //               {dadosCustos.map((item, i) => (
        //                 <div key={i} className="flex items-center justify-between text-sm">
        //                   <div className="flex items-center gap-2 text-slate-300 font-medium">
        //                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: CORES[i % CORES.length]}} />
        //                     {item.name}
        //                   </div>
        //                   <span className="text-slate-500">{item.value}%</span>
        //                 </div>
        //               ))}
        //             </div>
        //           </div>
        
      </Card>
    </div>
  );
}

function MetricCard({ title, value, sub, icon }: any) {
  return (
    <Card className="bg-white p-6">
      <div className="flex justify-between mb-4">
        <p className="text-xs text-slate-400">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </Card>
  );
}








// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { formatarNumeros, formatarMoeda } from "@/app/funcoes/funcoes";
// import { 
//   BarChart, Bar, LineChart, Line, XAxis, YAxis, 
//   CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
//   PieChart, Pie, Cell 
// } from 'recharts';
// import { TrendingUp, Fuel, Gauge, Navigation } from "lucide-react";

// // const dadosCustos = [
// //   { mes: 'Jan', combustivel: 12000, manutencao: 8000, pneus: 4000, lavagem: 500, outros: 0},
// //   { mes: 'Fev', combustivel: 14000, manutencao: 6000, pneus: 5000, lavagem: 500, outros: 0 },
// //   { mes: 'Mar', combustivel: 13000, manutencao: 9000, pneus: 4500, lavagem: 500, outros: 0 },
// //   { mes: 'Abr', combustivel: 15000, manutencao: 7000, pneus: 4000, lavagem: 1500, outros: 0 },
// //   { mes: 'Mai', combustivel: 14000, manutencao: 10000, pneus: 6000, lavagem: 750, outros: 0 },
// //   { mes: 'Jun', combustivel: 16000, manutencao: 8000, pneus: 5000, lavagem: 2000, outros: 0 },
// // ];

// // const dadosKm = [
// //   { mes: 'Jan', quilometragem: 12000 },
// //   { mes: 'Fev', quilometragem: 14000 },
// //   { mes: 'Mar', quilometragem: 13000 },
// //   { mes: 'Abr', quilometragem: 15000 },
// //   { mes: 'Mai', quilometragem: 14000 },
// //   { mes: 'Jun', quilometragem: 16000 },
// // ];

// // const dadosCustosPie = [
// //   { name: 'Combustível', value: 35 },
// //   { name: 'Manutenção', value: 35 },
// //   { name: 'Pneus', value: 15 },
// //   { name: 'Lavagem', value: 5 },
// //   { name: 'Outros', value: 10 },
// // ];

// const CORES = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

// export default function PaginaAnalises() {
//   const [custoTotal, setCustoTotal] = useState(0);
  
//   const [dadosCustos, setDadosCustos] = useState<any[]>([]);
//   const [dadosKm, setDadosKm] = useState<any[]>([]);

//   // useEffect(() => {
//   //   const total = dadosCustos.reduce((acc, curr) => 
//   //     acc + curr.Combustivel + curr.Manutencao + curr.Pneus + curr.Lavagem + curr.Outros, 0
//   //   );
//   //   setCustoTotal(total);
//   // }, []);
//   useEffect(() => {
//     async function carregarDados() {
//       try {
//         const resDespesas = await fetch("http://localhost:8000/despesas/analises/resumo");
//         const despesas = await resDespesas.json();
  
//         const resViagens = await fetch("http://localhost:8000/viagens/analises/resumo");
//         const viagens = await resViagens.json();
  
//         setDadosCustos(despesas);
//         setDadosKm(viagens);
  
//       } catch (error) {
//         console.error("Erro ao carregar dados:", error);
//       }
//     }
  
//     carregarDados();
//   }, []);

//   useEffect(() => {
//     const total = dadosCustos.reduce((acc, curr) => 
//       acc +
//       (curr.combustivel || 0) +
//       (curr.manutencao || 0) +
//       (curr.pneu || 0) +
//       (curr.lavagem || 0) +
//       (curr.outro || 0)
//     , 0);
  
//     setCustoTotal(total);
//   }, [dadosCustos]);

//   // Estilo customizado para o Tooltip do gráfico
//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg shadow-xl">
//           <p className="text-slate-100 font-bold mb-1">{label}</p>
//           {payload.map((item: any, i: number) => (
//             <p key={i} className="text-xs" style={{ color: item.color || item.fill }}>
//               {item.name}: {formatarMoeda(item.value)}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0F1A] text-slate-100 p-6 lg:p-10 space-y-10">
      
//       {/* Cabeçalho */}
//       <header>
//         <h1 className="text-4xl font-light tracking-tight text-white">
//           Análises e <span className="font-semibold text-blue-500">Relatórios</span>
//         </h1>
//         <p className="text-slate-400 mt-2 font-medium">Business Intelligence de Frota</p>
//       </header>

//       {/* Cards de Métricas */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <MetricCard title="Quilometragem" value={`${formatarNumeros(89000)} km`} sub="Últimos 6 meses" icon={<Gauge className="w-5 h-5 text-blue-400" />} />
//         <MetricCard title="Custo Total" value={formatarMoeda(custoTotal)} sub="Operação completa" icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} />
//         <MetricCard title="Consumo Médio" value="5,2 km/L" sub="Média da frota" icon={<Fuel className="w-5 h-5 text-amber-400" />} />
//         <MetricCard title="Viagens" value="142" sub="Eficiência de rota" icon={<Navigation className="w-5 h-5 text-purple-400" />} />
//       </div>

//       {/* Gráficos Principais */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* Gráfico de Barras */}
//         <Card className="bg-[#161B29] border-white/5 p-6 shadow-2xl overflow-hidden">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-lg font-medium text-slate-200">Fluxo de Custos Mensal</h2>
//           </div>
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={dadosCustos} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//               <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
//               <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
//               <Bar dataKey="combustivel" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
//               <Bar dataKey="manutencao" stackId="a" fill="#10b981" />
//               <Bar dataKey="pneus" stackId="a" fill="#f59e0b" />
//               <Bar dataKey="lavagem" stackId="a" fill="#ef4444" />
//               <Bar dataKey="outro" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Gráfico de Linhas */}
//         <Card className="bg-[#161B29] border-white/5 p-6 shadow-2xl">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-lg font-medium text-slate-200">Tendência de Rodagem</h2>
//           </div>
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={dadosKm} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
//               <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
//               <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
//               <Tooltip content={<CustomTooltip />} />
//               <Line 
//                 type="monotone" 
//                 dataKey="quilometragem" 
//                 stroke="#3b82f6" 
//                 strokeWidth={3} 
//                 dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0B0F1A' }} 
//                 activeDot={{ r: 6, strokeWidth: 0 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Footer / Distribuição */}
//       <Card className="bg-[#161B29] border-white/5 p-8 shadow-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 text-white">Composição de Gastos</h2>
//             <p className="text-slate-400 mb-6 leading-relaxed">
//               O combustível continua sendo o principal driver de custo, representando 35% da operação. 
//               Considere rotas otimizadas para reduzir este índice.
//             </p>
//             <div className="space-y-3">
//               {dadosCustos.map((item, i) => (
//                 <div key={i} className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2 text-slate-300 font-medium">
//                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: CORES[i % CORES.length]}} />
//                     {item.name}
//                   </div>
//                   <span className="text-slate-500">{item.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex justify-center h-75">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={dadosCustos}
//                   innerRadius={80}
//                   outerRadius={110}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {dadosCustos.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} stroke="none" />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

// function MetricCard({ title, value, sub, icon }: any) {
//   return (
//     <Card className="bg-[#161B29] border-white/5 p-6 hover:ring-1 hover:ring-blue-500/50 transition-all duration-300 group">
//       <div className="flex justify-between items-start mb-4">
//         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
//         <div className="p-2 bg-slate-900 rounded-lg border border-white/5 group-hover:border-blue-500/30 transition-colors">
//           {icon}
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-white mb-1">{value}</p>
//       <p className="text-xs text-slate-500 font-medium tracking-tight">{sub}</p>
//     </Card>
//   );
// }







// // 'use client';

// // import { Despesa } from '@/app/tipos/indices';
// // import { Card } from '@/components/ui/card';
// // import {formatarNumeros, formatarMoeda} from "@/app/funcoes/funcoes"
// // import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// // const dadosCustos = [
// //   { mes: 'Jan', Combustivel: 12000, Manutencao: 8000, Pneus: 4000, Lavagem: 500, Outros: 0},
// //   { mes: 'Fev', Combustivel: 14000, Manutencao: 6000, Pneus: 5000, Lavagem: 500, Outros: 0 },
// //   { mes: 'Mar', Combustivel: 13000, Manutencao: 9000, Pneus: 4500, Lavagem: 500, Outros: 0 },
// //   { mes: 'Abr', Combustivel: 15000, Manutencao: 7000, Pneus: 4000, Lavagem: 1500, Outros: 0 },
// //   { mes: 'Mai', Combustivel: 14000, Manutencao: 10000, Pneus: 6000, Lavagem: 750, Outros: 0 },
// //   { mes: 'Jun', Combustivel: 16000, Manutencao: 8000, Pneus: 5000, Lavagem: 2000, Outros: 0 },
// // ];

// // const dadosKm = [
// //   { mes: 'Jan', quilometragem: 12000 },
// //   { mes: 'Fev', quilometragem: 14000 },
// //   { mes: 'Mar', quilometragem: 13000 },
// //   { mes: 'Abr', quilometragem: 15000 },
// //   { mes: 'Mai', quilometragem: 14000 },
// //   { mes: 'Jun', quilometragem: 16000 },
// // ];

// // const dadosCustosPie = [
// //   { name: 'Combustível', value: 35 },
// //   { name: 'Manutenção', value: 35 },
// //   { name: 'Pneus', value: 15 },
// //   { name: 'Lavagem', value: 5 },
// //   { name: 'Outros', value: 10 },
// // ];

// // let custoTotal = 0
// // for (let i = 0; i < dadosCustos.length; i++) {
// //   custoTotal += dadosCustos[i].Manutencao;
// //   custoTotal += dadosCustos[i].Lavagem;
// //   custoTotal += dadosCustos[i].Combustivel;
// //   custoTotal += dadosCustos[i].Pneus;
// //   custoTotal += dadosCustos[i].Outros;
  
// // }

// // const CORES = ['#7c3aed', '#06b6d4', '#f59e0f', '#ef4444', '#333333'];

// // export default function PaginaAnalises() {
// //   return (
// //     <div className="space-y-8">
// //       {/* Cabeçalho */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-foreground">Análises e Relatórios</h1>
// //         <p className="text-muted-foreground mt-2">Visualize dados e tendências da sua frota</p>
// //       </div>

// //       {/* Quilometragem e custos */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <Card className="p-6">
// //           <p className="text-sm text-muted-foreground">Quilometragem Total</p>
// //           <p className="text-2xl font-bold text-foreground mt-2">{formatarNumeros(89000)} km</p>
// //           <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
// //         </Card>
// //         <Card className="p-6">
// //           <p className="text-sm text-muted-foreground">Custo Total</p>
// //           <p className="text-2xl font-bold text-foreground mt-2">
// //             {formatarMoeda(custoTotal)}
// //           </p>
// //           <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
// //         </Card>
// //         <Card className="p-6">
// //           <p className="text-sm text-muted-foreground">Consumo Médio</p>
// //           <p className="text-2xl font-bold text-foreground mt-2">5,2 km/L</p>
// //           <p className="text-xs text-muted-foreground mt-2">Frota total</p>
// //         </Card>
// //         <Card className="p-6">
// //           <p className="text-sm text-muted-foreground">Viagens Realizadas</p>
// //           <p className="text-2xl font-bold text-foreground mt-2">142</p>
// //           <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
// //         </Card>
// //       </div>

// //       {/* Gráficos */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Custos por Mês */}
// //         <Card className="p-6">
// //           <h2 className="text-xl font-bold text-foreground mb-4">Custos por Mês</h2>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={dadosCustos}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="mes" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="Combustivel" stackId="a" fill="#7c3aed"/>
// //               <Bar dataKey="Manutencao" stackId="a" fill="#06b6d4" />
// //               <Bar dataKey="Pneus" stackId="a" fill="#f59e0b" />
// //               <Bar dataKey="Lavagem" stackId="a" fill="#ef4444" />
// //               <Bar dataKey="Outros" stackId="a" fill="#333333" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Quilometragem por Mês */}
// //         <Card className="p-6">
// //           <h2 className="text-xl font-bold text-foreground mb-4">Quilometragem por Mês</h2>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={dadosKm}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="mes" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line type="linear" dataKey="quilometragem" stroke="#7c3aed" strokeWidth={2} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card>
// //       </div>

// //       {/* Distribuição de Custos */}
// //       <Card className="p-6">
// //         <h2 className="text-xl font-bold text-foreground mb-4">Distribuição de Custos</h2>
// //         <div className="flex justify-center">
// //           <ResponsiveContainer width={500} height={300}>
// //             <PieChart>
// //               <Pie
// //                 data={dadosCustosPie}
// //                 cx="50%"
// //                 cy="50%"
// //                 labelLine={false}
// //                 label={({ name, value }) => `${name}: ${value}%`}
// //                 outerRadius={80}
// //                 fill="#8884d8"
// //                 dataKey="value"
// //                 className='font-semibold'
// //               >
// //                 {dadosCustosPie.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }
