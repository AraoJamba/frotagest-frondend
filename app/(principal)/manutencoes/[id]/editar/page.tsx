'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioServico } from '@/app/componentes/FormularioServico';
import { ManutencaoVeiculo } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { FormularioManutencao } from '@/app/componentes/FormularioManutencoes';

export default function PaginaEditarServico() {
  const router = useRouter();
  const params = useParams();
  const { obterManutencao, atualizarManutencao } = useDados();
  const [manutencao, setManutencao] = useState<ManutencaoVeiculo | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const manutencaoEncontrado = obterManutencao(id);
    if (manutencaoEncontrado) {
      setManutencao(manutencaoEncontrado);
    }
  }, [params.id, obterManutencao]);

  if (!manutencao) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Serviço não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: ManutencaoVeiculo) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarManutencao(manutencao.id, dadosAtualizados);
    router.push('/servicos');
    setCarregando(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Editar Serviço</h1>
        <p className="text-muted-foreground mt-2">Atualize os dados do serviço</p>
      </div>

      <FormularioManutencao manutencao={manutencao} onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
