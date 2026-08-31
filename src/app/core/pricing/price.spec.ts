import { Product } from '../models/infrastructure.model';
import { defaultConfig, monthlyPrice } from './price';

const product: Product = {
  id: 'lw-gp-epyc',
  name: 'General Purpose EPYC',
  tagline: '',
  description: '',
  processor: 'AMD EPYC',
  baseRamGb: 32,
  ramOptions: [32, 64, 128],
  ramDeltaPer32: 16,
  locations: ['AMS-01', 'SIN-01'],
  baseMonthly: 79,
};

describe('monthlyPrice', () => {
  it('returns the list price for base RAM in Amsterdam, month to month', () => {
    expect(
      monthlyPrice(product, {
        skuId: product.id,
        locationId: 'AMS-01',
        ramGb: 32,
        contractTerm: '1',
      })
    ).toBe(79);
  });

  it('adds €16 per extra 32 GB of RAM', () => {
    expect(
      monthlyPrice(product, {
        skuId: product.id,
        locationId: 'AMS-01',
        ramGb: 64,
        contractTerm: '1',
      })
    ).toBe(95);
  });

  it('adds €12 for Singapore', () => {
    expect(
      monthlyPrice(product, {
        skuId: product.id,
        locationId: 'SIN-01',
        ramGb: 32,
        contractTerm: '1',
      })
    ).toBe(91);
  });

  it('applies 10% off for a 12-month term', () => {
    expect(
      monthlyPrice(product, {
        skuId: product.id,
        locationId: 'AMS-01',
        ramGb: 32,
        contractTerm: '12',
      })
    ).toBe(71);
  });

  it('compounds Singapore and the 12-month term, then rounds', () => {
    expect(
      monthlyPrice(product, {
        skuId: product.id,
        locationId: 'SIN-01',
        ramGb: 32,
        contractTerm: '12',
      })
    ).toBe(82);
  });
});

describe('defaultConfig', () => {
  it('starts from the first location and base RAM, month to month', () => {
    expect(defaultConfig(product)).toEqual({
      skuId: 'lw-gp-epyc',
      locationId: 'AMS-01',
      ramGb: 32,
      contractTerm: '1',
    });
  });
});
