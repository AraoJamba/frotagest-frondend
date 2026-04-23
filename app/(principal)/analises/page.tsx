'use client';

import { Despesa } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import {formatarNumeros, formatarMoeda} from "@/app/funcoes/funcoes"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dadosCustos = [
  { mes: 'Jan', Combustivel: 12000, Manutencao: 8000, Pneus: 4000, Lavagem: 500, Outros: 0},
  { mes: 'Fev', Combustivel: 14000, Manutencao: 6000, Pneus: 5000, Lavagem: 500, Outros: 0 },
  { mes: 'Mar', Combustivel: 13000, Manutencao: 9000, Pneus: 4500, Lavagem: 500, Outros: 0 },
  { mes: 'Abr', Combustivel: 15000, Manutencao: 7000, Pneus: 4000, Lavagem: 1500, Outros: 0 },
  { mes: 'Mai', Combustivel: 14000, Manutencao: 10000, Pneus: 6000, Lavagem: 750, Outros: 0 },
  { mes: 'Jun', Combustivel: 16000, Manutencao: 8000, Pneus: 5000, Lavagem: 2000, Outros: 0 },
];

const dadosKm = [
  { mes: 'Jan', quilometragem: 12000 },
  { mes: 'Fev', quilometragem: 14000 },
  { mes: 'Mar', quilometragem: 13000 },
  { mes: 'Abr', quilometragem: 15000 },
  { mes: 'Mai', quilometragem: 14000 },
  { mes: 'Jun', quilometragem: 16000 },
];

const dadosCustosPie = [
  { name: 'Combustível', value: 35 },
  { name: 'Manutenção', value: 35 },
  { name: 'Pneus', value: 15 },
  { name: 'Lavagem', value: 5 },
  { name: 'Outros', value: 10 },
];

let custoTotal = 0
for (let i = 0; i < dadosCustos.length; i++) {
  custoTotal += dadosCustos[i].Manutencao;
  custoTotal += dadosCustos[i].Lavagem;
  custoTotal += dadosCustos[i].Combustivel;
  custoTotal += dadosCustos[i].Pneus;
  custoTotal += dadosCustos[i].Outros;
  
}

const CORES = ['#7c3aed', '#06b6d4', '#f59e0f', '#ef4444', '#333333'];

export default function PaginaAnalises() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Análises e Relatórios</h1>
        <p className="text-muted-foreground mt-2">Visualize dados e tendências da sua frota</p>
      </div>

      {/* Quilometragem e custos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Quilometragem Total</p>
          <p className="text-2xl font-bold text-foreground mt-2">{formatarNumeros(89000)} km</p>
          <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Custo Total</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {formatarMoeda(custoTotal)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Consumo Médio</p>
          <p className="text-2xl font-bold text-foreground mt-2">5,2 km/L</p>
          <p className="text-xs text-muted-foreground mt-2">Frota total</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Viagens Realizadas</p>
          <p className="text-2xl font-bold text-foreground mt-2">142</p>
          <p className="text-xs text-muted-foreground mt-2">Últimos 6 meses</p>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custos por Mês */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Custos por Mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosCustos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Combustivel" stackId="a" fill="#7c3aed"/>
              <Bar dataKey="Manutencao" stackId="a" fill="#06b6d4" />
              <Bar dataKey="Pneus" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Lavagem" stackId="a" fill="#ef4444" />
              <Bar dataKey="Outros" stackId="a" fill="#333333" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quilometragem por Mês */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quilometragem por Mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosKm}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="quilometragem" stroke="#7c3aed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Distribuição de Custos */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Distribuição de Custos</h2>
        <div className="flex justify-center">
          <ResponsiveContainer width={500} height={300}>
            <PieChart>
              <Pie
                data={dadosCustosPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                className='font-semibold'
              >
                {dadosCustosPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
