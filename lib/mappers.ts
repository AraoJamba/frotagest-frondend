
export const mapViagem = (data: any) => {
  return {
    id: data.id,
    motoristaId: data.motorista_id,
    veiculoId: data.veiculo_id,

    localPartida: data.local_partida,
    localDestino: data.local_destino,

    distancia: data.distancia,
    status: data.status,

    combustivelGasto: data.combustivel_gasto,
    custoViagem: data.custo_viagem,

    dataInicio: data.data_inicio,
    dataFim: data.data_fim,

    observacoes: data.observacoes
  };
};


export const mapVeiculo = (data: any) => {
  return {
    id: data.id,
    placa: data.placa,
    marca: data.marca,
    modelo: data.modelo,
    ano: data.ano,

    VIN: data.vin, 

    tipo: data.tipo,
    combustivel: data.combustivel,
    consumoMedio: data.consumo_medio,
    capacidadeCarga: data.capacidade_carga,

    ultimaRevista: data.ultima_revisao,
    dataCadastro: data.data_cadastro,

    ativo: data.ativo,
  };
};


// Interface que reflete exatamente o que o FastAPI envia [3, 4]
export interface ServicoBackend {
  nome: string;
  descricao: string;
  tipo: string;
  custo_estimado: number;
  data_cadastro: string; 
  ativo: boolean;
}

// Interface que o seu Frontend Next.js prefere usar
export interface ServicoFrontend {
  nome: string;
  descricao: string;
  tipo: string;
  custoEstimado: number; // Mapeado
  dataCadastro: Date;    // Convertido para objeto Date
  ativo: boolean;
}

export const mapearServicoParaFrontend = (dados: ServicoBackend): ServicoFrontend => {
  return {
    ...dados,
    custoEstimado: dados.custo_estimado, // Traduzindo a chave
    dataCadastro: new Date(dados.data_cadastro), // Transformando string em Date
  };
};


