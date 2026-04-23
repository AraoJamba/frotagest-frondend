'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioServico } from '@/app/componentes/FormularioServico';
import { Servico } from '@/app/tipos/indices';

export default function PaginaAdicionarServico() {
  const router = useRouter();
  const { adicionarServico } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (servico: Servico) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    adicionarServico(servico);
    router.push('/servicos');
    setCarregando(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Novo Serviço</h1>
        <p className="text-muted-foreground mt-2">Cadastre um novo serviço disponível</p>
      </div>

      <FormularioServico onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
