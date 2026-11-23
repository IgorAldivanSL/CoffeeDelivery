import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Timer, DollarSign, ArrowLeft } from 'lucide-react';
import deliveryIllustration from '../../assets/illustrations/delivery-man.svg';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';
import { PaymentMethod } from '../../types';
import styles from './styles.module.css';

const paymentMethodLabels: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
};

export function Success() {
  const { lastOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastOrder) {
      navigate('/', { replace: true });
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) {
    return null;
  }

  return (
    <div className={styles.successContainer} data-testid="success-container">
      <header className={styles.successHeader}>
        <h1 className={styles.title}>Uhu! Pedido confirmado</h1>
        <p className={styles.subtitle}>
          Agora é só aguardar que logo o café chegará até você
        </p>
      </header>

      <div className={styles.successContent}>
        <div className={styles.orderInfoBorderWrapper}>
          <div className={styles.orderInfoCard}>
            {/* Endereço */}
            <div className={styles.infoItem} data-testid="success-address">
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-purple)' }}
                aria-hidden="true"
              >
                <MapPin size={16} />
              </div>
              <div>
                <p>
                  Entrega em{' '}
                  <strong>
                    {lastOrder.address.street}, {lastOrder.address.number}
                  </strong>{' '}
                  {lastOrder.address.complement && `- ${lastOrder.address.complement}`}
                </p>
                <p>
                  {lastOrder.address.neighborhood} - {lastOrder.address.city},{' '}
                  {lastOrder.address.uf}
                </p>
              </div>
            </div>

            {/* Previsão de entrega */}
            <div className={styles.infoItem} data-testid="success-estimate">
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-yellow)' }}
                aria-hidden="true"
              >
                <Timer size={16} />
              </div>
              <div>
                <p>Previsão de entrega</p>
                <p>
                  <strong>20 min - 30 min</strong>
                </p>
              </div>
            </div>

            {/* Pagamento */}
            <div className={styles.infoItem} data-testid="success-payment">
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-yellow-dark)' }}
                aria-hidden="true"
              >
                <DollarSign size={16} />
              </div>
              <div>
                <p>Pagamento na entrega</p>
                <p>
                  <strong>{paymentMethodLabels[lastOrder.paymentMethod]}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={deliveryIllustration}
          alt="Entregador em uma scooter com seu café a caminho"
          className={styles.deliveryIllustration}
        />
      </div>

      {/* Snapshot preservado dos itens pedidos (RN-06, RF-12, RF-13) */}
      <section className={styles.snapshotSummaryCard} aria-label="Resumo do pedido concluído">
        <div className={styles.snapshotSummaryTitle}>
          <span>Itens do pedido #{lastOrder.id.slice(0, 8)}</span>
          <span style={{ color: 'var(--color-purple-dark)' }}>
            Total: {formatCurrency(lastOrder.totalInCents)}
          </span>
        </div>

        <div className={styles.snapshotItemsList}>
          {lastOrder.items.map((item) => (
            <div key={item.coffee.id} className={styles.snapshotItemRow}>
              <span>
                {item.quantity}x {item.coffee.name}
              </span>
              <span>{formatCurrency(item.coffee.priceInCents * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Link to="/" className={styles.backHomeButton}>
          <ArrowLeft size={16} />
          <span>Fazer outro pedido</span>
        </Link>
      </section>
    </div>
  );
}
