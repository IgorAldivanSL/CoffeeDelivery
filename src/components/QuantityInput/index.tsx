import { Minus, Plus } from 'lucide-react';
import styles from './styles.module.css';

interface QuantityInputProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'medium' | 'small';
  min?: number;
}

export function QuantityInput({
  quantity,
  onIncrease,
  onDecrease,
  size = 'medium',
  min = 1,
}: QuantityInputProps) {
  return (
    <div className={`${styles.quantityContainer} ${styles[size]}`} data-testid="quantity-input">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Diminuir quantidade"
        className={styles.quantityButton}
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>

      <span className={styles.quantityText} data-testid="quantity-value">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Aumentar quantidade"
        className={styles.quantityButton}
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
