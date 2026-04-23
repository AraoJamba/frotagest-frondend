'use client';

import React, { useEffect } from "react";
import { useAutenticacao } from '@/app/contexto/AutenticacaoContexto';
import { BarraNavegacao } from '@/app/componentes/BarraNavegacao';
import { useRouter } from 'next/navigation';

export default function LayoutPrincipal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { estaAutenticado, carregando } = useAutenticacao();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !estaAutenticado) {
      router.push('/login');
    }
  }, [carregando, estaAutenticado, router]);

  // 🔥 enquanto verifica auth
  if (carregando) {
    return <p>Carregando...</p>;
  }

  // 🔥 se não autenticado
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
