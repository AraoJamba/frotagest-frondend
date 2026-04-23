'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Lembrete } from '@/app/tipos/indices';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioLembrete } from '@/app/componentes/FormularioLembrete';

export default function PaginaEditarLembrete() {
  const router = useRouter();
  const params = useParams();
  const { obterLembrete, atualizarLembrete } = useDados();
  const [lembrete, setLembrete] = useState<Lembrete | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const lembreteEncontrado = obterLembrete(id);
    if (lembreteEncontrado) {
      setLembrete(lembreteEncontrado);
    }
  }, [params.id, obterLembrete]);

  if (!lembrete) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Lembrete não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: Lembrete) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarLembrete(lembrete.id, dadosAtualizados);
    router.push('/lembretes');
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
          <h1 className="text-3xl font-bold text-foreground">Editar Lembrete</h1>
          <p className="text-muted-foreground mt-2">Atualize o lembrete</p>
        </div>
      </div>

      <FormularioLembrete onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
