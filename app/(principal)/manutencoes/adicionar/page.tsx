'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { ManutencaoVeiculo } from '@/app/tipos/indices';
import { FormularioManutencao } from '@/app/componentes/FormularioManutencoes';

export default function PaginaAdicionarManutencao() {
  const router = useRouter();
  const { adicionarManutencao } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (manutencao: ManutencaoVeiculo) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    adicionarManutencao(manutencao);
    router.push('/manutencoes');
    setCarregando(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nova Manutenção</h1>
        <p className="text-muted-foreground mt-2">Cadastre uma nova manutenção disponível</p>
      </div>

      <FormularioManutencao onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
