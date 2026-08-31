export type ContractTerm = '1' | '12';

export interface Location {
  id: string;
  city: string;
  countryCode: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  processor: string;
  baseRamGb: number;
  ramOptions: number[];
  ramDeltaPer32: number;
  locations: string[];
  baseMonthly: number;
  badge?: string;
}

export interface ServerConfig {
  skuId: string;
  locationId: string;
  ramGb: number;
  contractTerm: ContractTerm;
}

export interface QuoteItem {
  productName: string;
  locationLabel: string;
  summary: string;
  monthlyPrice: number;
  config: ServerConfig;
}
