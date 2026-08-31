import { Location, Product, ServerConfig } from '../models/infrastructure.model';

export function defaultConfig(product: Product): ServerConfig {
  return {
    skuId: product.id,
    locationId: product.locations[0],
    ramGb: product.baseRamGb,
    contractTerm: '1',
  };
}

export function monthlyPrice(product: Product, config: ServerConfig): number {
  const extraRam = Math.max(0, (config.ramGb - product.baseRamGb) / 32) * product.ramDeltaPer32;
  const locationBump = config.locationId === 'SIN-01' ? 12 : 0;
  const list = product.baseMonthly + extraRam + locationBump;
  const term = config.contractTerm === '12' ? 0.9 : 1;
  return Math.round(list * term);
}

export function configSummary(config: ServerConfig, locations: Location[]): string {
  const location = locations.find((item) => item.id === config.locationId);
  const term = config.contractTerm === '12' ? '12-month term' : 'month-to-month';
  return `${location?.city ?? config.locationId} · ${config.ramGb} GB RAM · ${term}`;
}
