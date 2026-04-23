'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
import { Motorista } from '@/app/tipos/indices';

export default function PaginaAdicionarMotorista() {
  const router = useRouter();
  const { adicionarMotorista } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (motorista: Motorista) => {
    try {
      setCarregando(true);

      await adicionarMotorista(motorista); // 🔥 agora é backend real

      router.push('/motoristas');
    } catch (error) {
      console.error("Erro ao criar motorista:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Novo Motorista</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados para cadastrar um novo motorista
        </p>
      </div>

      <FormularioMotorista onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}





/*
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioMotorista } from '@/app/componentes/FormularioMotorista';
import { Motorista } from '@/app/tipos/indices';

export default function PaginaAdicionarMotorista() {
  const router = useRouter();
  const { adicionarMotorista } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (motorista: Motorista) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    adicionarMotorista(motorista);
    router.push('/motoristas');
    setCarregando(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Novo Motorista</h1>
        <p className="text-muted-foreground mt-2">Preencha os dados para cadastrar um novo motorista</p>
      </div>

      <FormularioMotorista onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}

*/
