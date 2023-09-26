import { DataInterface } from "./interfaces/data";

export function formatterByResponse(data: any) : DataInterface {
  const { bpi: { EUR, GBP, USD } } = data;
  const { time: { updated, updatedISO, updateduk } } = data;

  const result: DataInterface = {
    usd: USD,
    eur: EUR,
    gbp: GBP,
    chartName: data.chartName,
    time: {
      updated: updated, 
      updatedISO: updatedISO, 
      updateduk: updateduk,
    },
    disclaimer: data.disclaimer,
  };

  return result;
}