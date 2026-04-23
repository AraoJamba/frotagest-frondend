"use client";

import { Provedor_Autenticacao } from "./contexto/AutenticacaoContexto";
import { Provedor_Dados } from "./contexto/DadosContexto";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provedor_Autenticacao>
      <Provedor_Dados>
        {children}
      </Provedor_Dados>
    </Provedor_Autenticacao>
  );
}
