'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Despesa, Lembrete } from '@/app/tipos/indices';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioDespesa } from '@/app/componentes/FormularioDespesa';

export default function PaginaEditarLembrete() {
  const router = useRouter();
  const params = useParams();
  const { obterDespesa, atualizarDespesa } = useDados();
  const [despesa, setDespesa] = useState<Despesa | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const despesaEncontrado = obterDespesa(id);
    if (despesaEncontrado) {
      setDespesa(despesaEncontrado);
    }
  }, [params.id, obterDespesa]);

  if (!despesa) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Despesa não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: Despesa) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarDespesa(despesa.id, dadosAtualizados);
    router.push('/despesas');
    setCarregando(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Editar Despesa</h1>
          <p className="text-muted-foreground mt-2">Atualize a despesa</p>
        </div>
      </div>

      <FormularioDespesa onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
