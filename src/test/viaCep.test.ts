import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAddressByCep } from '../services/viaCep';

describe('ViaCEP Service (RF-08, RN-07)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and return address details for a valid CEP', async () => {
    const mockResponse = {
      cep: '90010-000',
      logradouro: 'Rua dos Andradas',
      complemento: '',
      bairro: 'Centro Histórico',
      localidade: 'Porto Alegre',
      uf: 'RS',
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const address = await fetchAddressByCep('90010000');

    expect(address).toEqual({
      street: 'Rua dos Andradas',
      neighborhood: 'Centro Histórico',
      city: 'Porto Alegre',
      uf: 'RS',
    });
  });

  it('should reject CEPs that do not contain exactly 8 digits', async () => {
    await expect(fetchAddressByCep('123')).rejects.toThrow(
      'O CEP deve conter exatamente 8 dígitos numéricos.'
    );
  });

  it('should throw friendly error when CEP is not found by ViaCEP', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ erro: true }),
    } as Response);

    await expect(fetchAddressByCep('99999999')).rejects.toThrow(
      'CEP não encontrado. Por favor, preencha o endereço manualmente.'
    );
  });

  it('should throw friendly fallback error when network request fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(fetchAddressByCep('90010000')).rejects.toThrow(
      'Não foi possível consultar o CEP automaticamente. Você pode preencher o endereço manualmente.'
    );
  });
});
