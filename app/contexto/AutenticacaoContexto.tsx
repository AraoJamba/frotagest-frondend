'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';

import { api } from '@/lib/api';

export type PapelUsuario = 'admin' | 'gerente';

interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
}

interface AutenticacaoContextoType {
  usuarioAtual: UsuarioAutenticado | null;
  estaAutenticado: boolean;
  carregando: boolean;
  realizarLogin: (email: string, senha: string) => Promise<void>;
  realizarLogout: () => Promise<void>;
}

export const AutenticacaoContexto = createContext<
  AutenticacaoContextoType | undefined
>(undefined);

export function Provedor_Autenticacao({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioAutenticado | null>(null);
  const [carregando, setCarregando] = useState(true);

  // 🔥 ESSENCIAL: verifica usuário ao carregar app
  useEffect(() => {
const verificarUsuario = async () => {
  try {
    const res = await api.get('/auth/eu');

    setUsuarioAtual(res.data); // 👈 agora vem completo (id, nome, email, papel)
  } catch {
    setUsuarioAtual(null);
  } finally {
    setCarregando(false);
  }
};


    verificarUsuario();
  }, []);

  // 🔐 LOGIN
  const realizarLogin = async (email: string, senha: string) => {
    await api.post(
      '/auth/login', 
      { email, senha }
    );

    // depois do login, pega usuário
    const res = await api.get('/auth/eu');
    setUsuarioAtual(res.data);
  };

  // 🚪 LOGOUT
  const realizarLogout = async () => {
    await api.post('/auth/logout'); // se tiver no backend
    setUsuarioAtual(null);
  };

  return (
    <AutenticacaoContexto.Provider
      value={{
        usuarioAtual,
        estaAutenticado: !!usuarioAtual,
        carregando,
        realizarLogin,
        realizarLogout,
      }}
    >
      {children}
    </AutenticacaoContexto.Provider>
  );
}

export function useAutenticacao() {
  const contexto = useContext(AutenticacaoContexto);
  if (!contexto) {
    throw new Error('useAutenticacao deve ser usado dentro do Provider');
  }
  return contexto;
}




/* 'use client';
import { api } from "@/lib/api";

import { useEffect } from 'react';



import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PapelUsuario = 'admin' | 'gerente' | 'motorista';

interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
}

interface AutenticacaoContextoType {
  usuarioAtual: UsuarioAutenticado | null;
  estaAutenticado: boolean;
  realizarLogin: (email: string, senha: string) => Promise<void>;
  realizarCadastro: (nome: string, email: string, senha: string, papel: PapelUsuario) => Promise<void>;
  realizarLogout: () => void;
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoType | undefined>(undefined);

export function Provedor_Autenticacao({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioAutenticado | null>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioAtual');
    if (usuarioSalvo) {
      setUsuarioAtual(JSON.parse(usuarioSalvo));
    }
  }, []);

const realizarLogin = async (email: string, senha: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      senha,
    });

    const usuario = response.data;

    setUsuarioAtual(usuario);
    localStorage.setItem('usuarioAtual', JSON.stringify(usuario));

  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Erro ao fazer login"
    );
  }
};


  const realizarCadastro = async (nome: string, email: string, senha: string, papel: PapelUsuario) => {
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const novoUsuario: UsuarioAutenticado = {
      id: Date.now().toString(),
      nome,
      email,
      papel,
    };

    setUsuarioAtual(novoUsuario);
    localStorage.setItem('usuarioAtual', JSON.stringify(novoUsuario));
  };

  const realizarLogout = () => {
    setUsuarioAtual(null);
    localStorage.removeItem('usuarioAtual');
  };

  return (
    <AutenticacaoContexto.Provider
      value={{
        usuarioAtual,
        estaAutenticado: usuarioAtual !== null,
        realizarLogin,
        realizarCadastro,
        realizarLogout,
      }}
    >
      {children}
    </AutenticacaoContexto.Provider>
  );
}

export function useAutenticacao() {
  const contexto = useContext(AutenticacaoContexto);
  if (!contexto) {
    throw new Error('useAutenticacao deve ser usado dentro de Provedor_Autenticacao');
  }
  return contexto;
} 
  */
