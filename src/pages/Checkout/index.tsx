import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  CircleDollarSign,
  CreditCard,
  Building,
  Banknote,
  Loader2,
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItemCard } from '../../components/CartItemCard';
import { fetchAddressByCep } from '../../services/viaCep';
import { formatCurrency } from '../../utils/currency';
import { OrderSnapshot, PaymentMethod } from '../../types';
import styles from './styles.module.css';

const checkoutValidationSchema = z.object({
  cep: z
    .string()
    .min(8, 'Informe um CEP válido')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 8, 'O CEP deve conter 8 dígitos'),
  street: z.string().min(2, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Informe o bairro'),
  city: z.string().min(2, 'Informe a cidade'),
  uf: z
    .string()
    .min(2, 'Informe a UF')
    .max(2, 'UF deve ter 2 caracteres')
    .toUpperCase(),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    errorMap: () => ({ message: 'Selecione uma forma de pagamento' }),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutValidationSchema>;

export function Checkout() {
  const {
    items,
    itemsSubtotalInCents,
    deliveryFeeInCents,
    totalInCents,
    clearCart,
    setLastOrder,
  } = useCart();

  const navigate = useNavigate();
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [cepFeedback, setCepFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutValidationSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      uf: '',
      paymentMethod: undefined,
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
    const rawCep = e.target.value;
    const cleanCep = rawCep.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      try {
        setIsFetchingCep(true);
        setCepFeedback('Buscando endereço via CEP...');
        const address = await fetchAddressByCep(cleanCep);

        setValue('street', address.street, { shouldValidate: true });
        setValue('neighborhood', address.neighborhood, { shouldValidate: true });
        setValue('city', address.city, { shouldValidate: true });
        setValue('uf', address.uf, { shouldValidate: true });
        setCepFeedback(null);
        setFocus('number');
      } catch (err) {
        if (err instanceof Error) {
          setCepFeedback(err.message);
        } else {
          setCepFeedback('Erro ao buscar CEP. Preencha os campos manualmente.');
        }
      } finally {
        setIsFetchingCep(false);
      }
    }
  }

  function handleSelectPaymentMethod(method: PaymentMethod) {
    setValue('paymentMethod', method, { shouldValidate: true });
  }

  function handleConfirmOrder(data: CheckoutFormData) {
    if (items.length === 0) {
      return;
    }

    const orderSnapshot: OrderSnapshot = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      items,
      itemsSubtotalInCents,
      deliveryFeeInCents,
      totalInCents,
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        uf: data.uf,
      },
      paymentMethod: data.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setLastOrder(orderSnapshot);
    clearCart();
    navigate('/success');
  }

  return (
    <form
      className={styles.checkoutContainer}
      onSubmit={handleSubmit(handleConfirmOrder)}
      data-testid="checkout-form"
    >
      {/* Coluna Esquerda: Formulários */}
      <div className={styles.formColumns}>
        <h2 className={styles.sectionTitle}>Complete seu pedido</h2>

        {/* Card de Endereço */}
        <section className={styles.cardBox} aria-label="Endereço de Entrega">
          <header className={styles.boxHeader}>
            <MapPin size={22} color="var(--color-yellow-dark)" />
            <div className={styles.boxHeaderText}>
              <h3 className={styles.boxTitle}>Endereço de Entrega</h3>
              <p className={styles.boxSubtitle}>
                Informe o endereço onde deseja receber seu pedido
              </p>
            </div>
          </header>

          <div className={styles.inputsContainer}>
            <div className={styles.inputWrapper} style={{ maxWidth: '12.5rem' }}>
              <input
                type="text"
                placeholder="CEP"
                maxLength={9}
                className={styles.inputField}
                {...register('cep')}
                onBlur={(e) => {
                  register('cep').onBlur(e);
                  handleCepBlur(e);
                }}
              />
              {isFetchingCep && (
                <span className={styles.cepFeedback}>
                  <Loader2 size={12} className="animate-spin" /> Consultando CEP...
                </span>
              )}
              {cepFeedback && !isFetchingCep && (
                <span className={styles.cepFeedback}>{cepFeedback}</span>
              )}
              {errors.cep && <span className={styles.errorMessage}>{errors.cep.message}</span>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Rua"
                className={styles.inputField}
                {...register('street')}
              />
              {errors.street && (
                <span className={styles.errorMessage}>{errors.street.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper} style={{ width: '12.5rem' }}>
                <input
                  type="text"
                  placeholder="Número"
                  className={styles.inputField}
                  {...register('number')}
                />
                {errors.number && (
                  <span className={styles.errorMessage}>{errors.number.message}</span>
                )}
              </div>

              <div className={`${styles.inputWrapper} ${styles.flex1}`}>
                <input
                  type="text"
                  placeholder="Complemento"
                  className={styles.inputField}
                  {...register('complement')}
                />
                <span className={styles.inputOptionalLabel}>Opcional</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper} style={{ width: '12.5rem' }}>
                <input
                  type="text"
                  placeholder="Bairro"
                  className={styles.inputField}
                  {...register('neighborhood')}
                />
                {errors.neighborhood && (
                  <span className={styles.errorMessage}>{errors.neighborhood.message}</span>
                )}
              </div>

              <div className={`${styles.inputWrapper} ${styles.flex1}`}>
                <input
                  type="text"
                  placeholder="Cidade"
                  className={styles.inputField}
                  {...register('city')}
                />
                {errors.city && (
                  <span className={styles.errorMessage}>{errors.city.message}</span>
                )}
              </div>

              <div className={styles.inputWrapper} style={{ width: '3.75rem' }}>
                <input
                  type="text"
                  placeholder="UF"
                  maxLength={2}
                  style={{ textTransform: 'uppercase' }}
                  className={styles.inputField}
                  {...register('uf')}
                />
                {errors.uf && (
                  <span className={styles.errorMessage}>{errors.uf.message}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Card de Pagamento */}
        <section className={styles.cardBox} aria-label="Opções de Pagamento">
          <header className={styles.boxHeader}>
            <CircleDollarSign size={22} color="var(--color-purple)" />
            <div className={styles.boxHeaderText}>
              <h3 className={styles.boxTitle}>Pagamento</h3>
              <p className={styles.boxSubtitle}>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </header>

          <div className={styles.paymentOptions}>
            <button
              type="button"
              onClick={() => handleSelectPaymentMethod('credit')}
              className={`${styles.paymentButton} ${
                selectedPaymentMethod === 'credit' ? styles.selected : ''
              }`}
              aria-pressed={selectedPaymentMethod === 'credit'}
            >
              <CreditCard size={16} color="var(--color-purple)" />
              <span>Cartão de Crédito</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPaymentMethod('debit')}
              className={`${styles.paymentButton} ${
                selectedPaymentMethod === 'debit' ? styles.selected : ''
              }`}
              aria-pressed={selectedPaymentMethod === 'debit'}
            >
              <Building size={16} color="var(--color-purple)" />
              <span>Cartão de Débito</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPaymentMethod('cash')}
              className={`${styles.paymentButton} ${
                selectedPaymentMethod === 'cash' ? styles.selected : ''
              }`}
              aria-pressed={selectedPaymentMethod === 'cash'}
            >
              <Banknote size={16} color="var(--color-purple)" />
              <span>Dinheiro</span>
            </button>
          </div>
          {errors.paymentMethod && (
            <span className={styles.errorMessage}>{errors.paymentMethod.message}</span>
          )}
        </section>
      </div>

      {/* Coluna Direita: Resumo dos Cafés Selecionados */}
      <div>
        <h2 className={styles.sectionTitle}>Cafés selecionados</h2>

        <div className={styles.selectedCoffeesCard}>
          {items.length === 0 ? (
            <div className={styles.emptyCart} data-testid="empty-cart-message">
              <p>Seu carrinho está vazio.</p>
              <p>Que tal escolher um café delicioso em nosso catálogo?</p>
              <Link to="/" className={styles.backHomeLink}>
                Ver catálogo de cafés
              </Link>
            </div>
          ) : (
            <>
              <div data-testid="cart-items-list">
                {items.map((item) => (
                  <CartItemCard key={item.coffee.id} item={item} />
                ))}
              </div>

              <div className={styles.totalsContainer}>
                <div className={styles.totalRow}>
                  <span>Total de itens</span>
                  <span data-testid="subtotal-value">
                    {formatCurrency(itemsSubtotalInCents)}
                  </span>
                </div>

                <div className={styles.totalRow}>
                  <span>Entrega</span>
                  <span data-testid="delivery-fee-value">
                    {formatCurrency(deliveryFeeInCents)}
                  </span>
                </div>

                <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                  <span>Total</span>
                  <span data-testid="total-value">{formatCurrency(totalInCents)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={items.length === 0 || isSubmitting}
                className={styles.confirmButton}
                data-testid="confirm-order-button"
              >
                {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
