'use client';

import React from "react"

import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { Card } from '@/components/ui/card';
import { Truck, Users, MapPin, Wrench } from 'lucide-react';

interface CartaEstatistica {
  titulo: string;
  valor: string | number;
  descricao: string;
  icone: React.ComponentType<{ className?: string }>;
  cor: string;
}

export default function PaginaDashboard() {
  const { usuarioAtual } = useAutenticacao();

  const cartasEstatisticas: CartaEstatistica[] = [
    {
      titulo: 'Veículos Ativos',
      valor: 24,
      descricao: 'Frota em operação',
      icone: Truck,
      cor: 'bg-primary/10 text-primary',
    },
    {
      titulo: 'Motoristas',
      valor: 15,
      descricao: 'Motoristas cadastrados',
      icone: Users,
      cor: 'bg-accent/10 text-accent',
    },
    {
      titulo: 'Viagens Ativas',
      valor: 8,
      descricao: 'Viagens em progresso',
      icone: MapPin,
      cor: 'bg-chart-2/10 text-chart-2',
    },
    {
      titulo: 'Manutenção Pendente',
      valor: 3,
      descricao: 'Serviços agendados',
      icone: Wrench,
      cor: 'bg-chart-4/10 text-chart-4',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Bem-vindo, {usuarioAtual?.nome}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Aqui está o resumo geral da sua frota
        </p>
      </div>

      {/* Cartões de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cartasEstatisticas.map((carta) => {
          const Icone = carta.icone;
          return (
            <Card key={carta.titulo} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{carta.titulo}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{carta.valor}</p>
                  <p className="text-xs text-muted-foreground mt-2">{carta.descricao}</p>
                </div>
                <div className={`p-3 rounded-lg ${carta.cor}`}>
                  <Icone className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Seção de Atividades Recentes */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Viagem iniciada</p>
              <p className="text-xs text-muted-foreground">Veículo: Scania 124 - Motorista: João Silva</p>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Há 2 horas</p>
          </div>
          
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Novo motorista cadastrado</p>
              <p className="text-xs text-muted-foreground">Carlos Eduardo - CNH válida</p>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Há 5 horas</p>
          </div>

          <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <div className="w-2 h-2 rounded-full bg-chart-4 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Manutenção agendada</p>
              <p className="text-xs text-muted-foreground">Veículo: Volvo FH16 - Revisão completa</p>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Há 1 dia</p>
          </div>
        </div>
      </Card>

      {/* Dicas */}
      <Card className="p-6 bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Dica de Uso</h3>
        <p className="text-sm text-foreground/80">
          Use o menu lateral para acessar todos os módulos do sistema. Dependendo do seu papel de usuário, 
          alguns itens podem estar restritos. Se tiver dúvidas, acesse a seção de Configurações.
        </p>
      </Card>
    </div>
  );
}
