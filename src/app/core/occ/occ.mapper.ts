import { Location, Product } from '../models/infrastructure.model';
import { OccPointOfService, OccProduct, OccProductSearchPage } from './occ.models';

function featureValue(product: OccProduct, code: string): string {
  for (const group of product.classifications ?? []) {
    const feature = group.features.find((item) => item.code === code);
    if (feature?.featureValues[0]?.value) {
      return feature.featureValues[0].value;
    }
  }
  return '';
}

export function mapPointOfService(pos: OccPointOfService): Location {
  return {
    id: pos.name,
    city: pos.displayName,
    countryCode: pos.address.country.isocode,
  };
}

export function mapOccProduct(product: OccProduct): Product {
  const ramGroup = product.baseOptions?.find((item) => item.variantType === 'LeasewebRamVariant');
  const ramOptions = (ramGroup?.options ?? [])
    .map((option) => Number(option.variantOptionQualifiers.find((q) => q.qualifier === 'ramGb')?.value))
    .filter((value) => Number.isFinite(value));

  return {
    id: product.code,
    name: product.name,
    tagline: product.summary,
    description: product.description,
    processor: featureValue(product, 'processor'),
    baseRamGb: Number(featureValue(product, 'baseRamGb')) || ramOptions[0] || 0,
    ramOptions,
    ramDeltaPer32: Number(featureValue(product, 'ramDeltaPer32')) || 0,
    locations: featureValue(product, 'locationCodes')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    baseMonthly: product.price.value,
    badge: product.tags?.[0],
  };
}

export function mapOccCatalog(page: OccProductSearchPage): { products: Product[]; locations: Location[] } {
  return {
    products: page.products.map(mapOccProduct),
    locations: page.pointOfServices.map(mapPointOfService),
  };
}
