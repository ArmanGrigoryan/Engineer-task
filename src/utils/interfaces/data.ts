interface DataCurrencyItemInterface {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
  symbol: string;
}

interface TimeCurrencyItem {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface DataInterface {
  eur: DataCurrencyItemInterface;
  gbp: DataCurrencyItemInterface;
  usd: DataCurrencyItemInterface;
  chartName: string;
  disclaimer: string;
  time: TimeCurrencyItem;
}