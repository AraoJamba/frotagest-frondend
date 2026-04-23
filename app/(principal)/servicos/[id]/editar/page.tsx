'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioServico } from '@/app/componentes/FormularioServico';
import { Servico } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';

export default function PaginaEditarServico() {
  const router = useRouter();
  const params = useParams();
  const { obterServico, atualizarServico } = useDados();
  const [servico, setServico] = useState<Servico | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const servicoEncontrado = obterServico(id);
    if (servicoEncontrado) {
      setServico(servicoEncontrado);
    }
  }, [params.id, obterServico]);

  if (!servico) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Serviço não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: Servico) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarServico(servico.id, dadosAtualizados);
    router.push('/servicos');
    setCarregando(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Editar Serviço</h1>
        <p className="text-muted-foreground mt-2">Atualize os dados do serviço</p>
      </div>

      <FormularioServico servico={servico} onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
