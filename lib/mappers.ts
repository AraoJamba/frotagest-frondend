export function mapViagem(data: any) {
  return {
    id: data.id,

    localPartida: data.local_partida,
    localDestino: data.local_destino,

    distancia: data.distancia,

    dataInicio: data.data_inicio,

    status: data.status, // ajustar depois se precisar

    motoristaId: data.motorista_id,
    veiculoId: data.veiculo_id,
  };
}
