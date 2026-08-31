import { OccProduct, OccProductSearchPage } from './occ.models';
import { mapOccCatalog, mapOccProduct, mapPointOfService } from './occ.mapper';

const occProduct: OccProduct = {
  code: 'lw-gp-epyc',
  name: 'General Purpose EPYC',
  summary: 'Everyday production',
  description: 'Single-tenant AMD server',
  purchasable: true,
  price: { currencyIso: 'EUR', value: 79 },
  stock: { stockLevelStatus: 'inStock' },
  tags: ['Popular'],
  categories: [{ code: 'dedicated-servers', name: 'Dedicated Servers' }],
  classifications: [
    {
      code: 'hardware',
      name: 'Hardware',
      features: [
        { code: 'processor', name: 'Processor', featureValues: [{ value: 'AMD EPYC 7313P · 16 cores' }] },
        { code: 'baseRamGb', name: 'Base RAM (GB)', featureValues: [{ value: '32' }] },
        { code: 'ramDeltaPer32', name: 'RAM delta per 32GB', featureValues: [{ value: '16' }] },
        { code: 'locationCodes', name: 'Allowed locations', featureValues: [{ value: 'AMS-01,FRA-10' }] },
      ],
    },
  ],
  baseOptions: [
    {
      variantType: 'LeasewebRamVariant',
      options: [
        {
          code: 'ram-32',
          variantOptionQualifiers: [{ qualifier: 'ramGb', value: '32' }],
          priceData: { currencyIso: 'EUR', value: 0 },
        },
        {
          code: 'ram-64',
          variantOptionQualifiers: [{ qualifier: 'ramGb', value: '64' }],
          priceData: { currencyIso: 'EUR', value: 16 },
        },
      ],
    },
  ],
};

describe('mapOccProduct', () => {
  it('maps OCC product fields onto the storefront model', () => {
    expect(mapOccProduct(occProduct)).toEqual({
      id: 'lw-gp-epyc',
      name: 'General Purpose EPYC',
      tagline: 'Everyday production',
      description: 'Single-tenant AMD server',
      processor: 'AMD EPYC 7313P · 16 cores',
      baseRamGb: 32,
      ramOptions: [32, 64],
      ramDeltaPer32: 16,
      locations: ['AMS-01', 'FRA-10'],
      baseMonthly: 79,
      badge: 'Popular',
    });
  });

  it('falls back when classifications and RAM variants are missing', () => {
    const mapped = mapOccProduct({
      ...occProduct,
      tags: undefined,
      classifications: undefined,
      baseOptions: undefined,
    });
    expect(mapped.processor).toBe('');
    expect(mapped.baseRamGb).toBe(0);
    expect(mapped.ramOptions).toEqual([]);
    expect(mapped.locations).toEqual([]);
    expect(mapped.badge).toBeUndefined();
  });
});

describe('mapOccCatalog', () => {
  const page: OccProductSearchPage = {
    products: [occProduct],
    pointOfServices: [
      {
        name: 'AMS-01',
        displayName: 'Amsterdam',
        address: { country: { isocode: 'NL' } },
      },
    ],
  };

  it('maps products and point of services', () => {
    const catalog = mapOccCatalog(page);
    expect(catalog.products.length).toBe(1);
    expect(catalog.products[0].id).toBe('lw-gp-epyc');
    expect(mapPointOfService(page.pointOfServices[0])).toEqual({
      id: 'AMS-01',
      city: 'Amsterdam',
      countryCode: 'NL',
    });
    expect(catalog.locations).toEqual([{ id: 'AMS-01', city: 'Amsterdam', countryCode: 'NL' }]);
  });
});
