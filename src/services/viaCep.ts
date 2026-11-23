export interface ViaCepAddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export async function fetchAddressByCep(rawCep: string): Promise<AddressData> {
  const cleanCep = rawCep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('O CEP deve conter exatamente 8 dígitos numéricos.');
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (!response.ok) {
      throw new Error('Falha ao comunicar com o serviço de CEP.');
    }

    const data: ViaCepAddressResponse = await response.json();

    if (data.erro) {
      throw new Error('CEP não encontrado. Por favor, preencha o endereço manualmente.');
    }

    return {
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      uf: data.uf || '',
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('CEP não encontrado')) {
      throw error;
    }
    throw new Error(
      'Não foi possível consultar o CEP automaticamente. Você pode preencher o endereço manualmente.'
    );
  }
}
