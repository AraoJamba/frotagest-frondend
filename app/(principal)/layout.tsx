'use client';

import React, { useEffect } from "react";

import { useRouter } from 'next/navigation';

import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';

import { BarraNavegacao } from '@/app/componentes/BarraNavegacao';

import { useDados } from '@/app/contexto/DadosContexto';

interface LayoutDashboardProps {
  children: React.ReactNode;
}

export default function LayoutSecundario({
  children,
}: LayoutDashboardProps) {

  const router = useRouter();

  const {
    estaAutenticado,
    carregando,
  } = useAutenticacao();

  const {
    carregarMotoristas,
    carregarDespesas,
    carregarPostoCombustivel,
    carregarVeiculos,
    carregarViagens,
    carregarLembretes,
    carregarManutencoes,
    carregarServicos,
  } = useDados();

  // CARREGAR DADOS
  useEffect(() => {
    carregarMotoristas();
    carregarVeiculos();
    carregarViagens();
    carregarDespesas();
    carregarPostoCombustivel();
    carregarLembretes();
    carregarManutencoes();
    carregarServicos();
  }, []);

  // VERIFICAR AUTENTICAÇÃO
  useEffect(() => {
    if (!carregando && !estaAutenticado) {
      router.push('/login');
    }
  }, [carregando, estaAutenticado, router]);

  // LOADING
  if (carregando) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">

        <div className="flex flex-col items-center gap-5">

          <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              A Carregar
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Aguarde um momento...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // NÃO AUTENTICADO
  if (!estaAutenticado) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* SIDEBAR */}
      <BarraNavegacao />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto md:ml-72">

        <div className="min-h-screen p-4 md:p-6 lg:p-8">

          {/* CONTAINER */}
          <div className="max-w-7xl mx-auto">
            {children}
          </div>

        </div>
      </main>
    </div>
  );
}