'use client';


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useDados } from '@/app/contexto/DadosContexto';
import { useState } from 'react';
import { PostoCombustivel } from '@/app/tipos/indices';
import { FormularioPostoCombustivel } from '@/app/componentes/FormularioPostoCombustivel';
import { useRouter } from 'next/navigation';

export default function PaginaAdicionarPostoCombustivel() {
  const router = useRouter();
  const { adicionarPostoCombustivel } = useDados();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (postoCombustivel: PostoCombustivel) => {
    setCarregando(carregando);
    await new Promise(resolve => setTimeout(resolve, 500));
    adicionarPostoCombustivel(postoCombustivel);
    router.push('/postos-combustivel');
    setCarregando(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/postos-combustivel">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novo Posto</h1>
          <p className="text-muted-foreground mt-2">Cadastre um novo posto de combustível</p>
        </div>
      </div>

      <FormularioPostoCombustivel onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
