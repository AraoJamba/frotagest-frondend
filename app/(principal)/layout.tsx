'use client';

import React, { useEffect } from "react";
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { BarraNavegacao } from '@/app/componentes/BarraNavegacao';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';


interface LayoutDashboardProps {
  children: React.ReactNode;
}

// 1. Usando uma estrutura mais explícita para evitar o erro de exportação
export default function LayoutDashboard({ children }: LayoutDashboardProps) {
  const { estaAutenticado, carregando } = useAutenticacao();
  const router = useRouter();

  const { carregarMotoristas, carregarDespesas, carregarPostoCombustivel, carregarVeiculos, carregarViagens,
    carregarLembretes, carregarManutencoes, carregarServicos
   } = useDados();

useEffect(() => {
  carregarMotoristas();
  carregarVeiculos();
  carregarViagens();
  carregarDespesas();
  carregarPostoCombustivel();
  carregarLembretes()
  carregarManutencoes()
  carregarServicos();
}, []);


  useEffect(() => {
    if (!carregando && !estaAutenticado) {
      router.push('/login');
    }
  }, [carregando, estaAutenticado, router]);


  // 🔥 Loading State com Tailwind refinado
  if (carregando) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#09090b]">
        <div className="w-12 h-12 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-4 text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Autenticando
        </p>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada enquanto o router.push acontece
  if (!estaAutenticado) return null;

return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans antialiased">
      <BarraNavegacao />
      <main className="flex-1 overflow-y-auto md:ml-72 bg-gradient-to-br from-zinc-900/40 to-black/20 border-l border-zinc-800/30">
        <div className="p-4 md:p-10 lg:p-12 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}






// 'use client';

// import React, { useEffect } from "react";
// import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
// import { BarraNavegacao } from '@/app/componentes/BarraNavegacao';
// import { useRouter } from 'next/navigation';

// export default function LayoutPrincipal({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { estaAutenticado, carregando } = useAutenticacao();
//   const router = useRouter();

//   useEffect(() => {
//     if (!carregando && !estaAutenticado) {
//       router.push('/login');
//     }
//   }, [carregando, estaAutenticado, router]);

//   // 🔥 enquanto verifica auth
//   if (carregando) {
//     return <p>Carregando...</p>;
//   }

//   // 🔥 se não autenticado
//   if (!estaAutenticado) {
//     return null;
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <BarraNavegacao />
//       <main className="flex-1 overflow-auto md:ml-64">
//         <div className="p-4 md:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }


/* 'use client';

import React from "react"

import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { BarraNavegacao } from '@/app/componentes/BarraNavegacao';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LayoutPrincipal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { estaAutenticado } = useAutenticacao();
  const router = useRouter();

  useEffect(() => {
    if (!estaAutenticado) {
      router.push('/login');
    }
  }, [estaAutenticado, router]);

  if (!estaAutenticado) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <BarraNavegacao />
      <main className="flex-1 overflow-auto md:ml-64">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
*/
