/** Subset of SAP Commerce OCC product + store-finder payloads used by this demo. */

export interface OccPrice {
  currencyIso: string;
  value: number;
}

export interface OccFeature {
  code: string;
  name: string;
  featureValues: { value: string }[];
}

export interface OccProduct {
  code: string;
  name: string;
  summary: string;
  description: string;
  purchasable: boolean;
  price: OccPrice;
  stock: { stockLevelStatus: string };
  tags?: string[];
  categories: { code: string; name: string }[];
  classifications?: { code: string; name: string; features: OccFeature[] }[];
  baseOptions?: {
    variantType: string;
    options: {
      code: string;
      variantOptionQualifiers: { qualifier: string; value: string }[];
      priceData: OccPrice;
    }[];
  }[];
}

export interface OccPointOfService {
  name: string;
  displayName: string;
  address: { country: { isocode: string } };
}

export interface OccProductSearchPage {
  products: OccProduct[];
  pointOfServices: OccPointOfService[];
}
