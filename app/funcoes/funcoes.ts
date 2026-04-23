

export function formatarData(data?: string) {
  if (!data) return "-";

  const d = new Date(data + "Z"); // 👈 força UTC

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString('pt-AO');
}




export function formatarMoeda(valor: number) {
    return new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(valor)
}

export function formatarNumeros(valor?: number | null) {
  if (valor === undefined || valor === null) return "-";
  return Number(valor).toLocaleString('pt-AO');
}

