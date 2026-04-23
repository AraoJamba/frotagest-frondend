'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDados } from '@/app/contexto/DadosContexto';
import { FormularioViagem } from '@/app/componentes/FormularioViagem';
import { Viagem } from '@/app/tipos/indices';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';




export default function PaginaEditarViagem() {
  const router = useRouter();
  const params = useParams();
  const { obterViagem, atualizarViagem } = useDados();
  const [viagem, setViagem] = useState<Viagem | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const viagemEncontrado = obterViagem(id);
    if (viagemEncontrado) {
      setViagem(viagemEncontrado);
    }
  }, [params.id, obterViagem]);

  if (!viagem) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Viagem não encontrado</p>
      </Card>
    );
  }

  const handleSubmit = async (dadosAtualizados: Viagem) => {
    setCarregando(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    atualizarViagem(viagem.id, dadosAtualizados);
    router.push('/viagens');
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
          <h1 className="text-3xl font-bold text-foreground">Editar Viagem</h1>
          <p className="text-muted-foreground mt-2">Atualize os dados da viagem</p>
        </div>
      </div>

      <FormularioViagem viagem={viagem} onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
