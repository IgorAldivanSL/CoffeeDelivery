import { Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../hooks/useCart';
import { QuantityInput } from '../QuantityInput';
import { formatCurrency } from '../../utils/currency';
import styles from './styles.module.css';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateItemQuantity, removeItem } = useCart();

  function handleIncrease() {
    updateItemQuantity(item.coffee.id, item.quantity + 1);
  }

  function handleDecrease() {
    if (item.quantity > 1) {
      updateItemQuantity(item.coffee.id, item.quantity - 1);
    }
  }

  function handleRemove() {
    removeItem(item.coffee.id);
  }

  const itemTotal = item.coffee.priceInCents * item.quantity;

  return (
    <div className={styles.cartItem} data-testid={`cart-item-${item.coffee.id}`}>
      <img src={item.coffee.image} alt={item.coffee.name} className={styles.itemImage} />

      <div className={styles.itemDetails}>
        <span className={styles.itemName}>{item.coffee.name}</span>
        <div className={styles.itemControls}>
          <QuantityInput
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            size="small"
          />

          <button
            type="button"
            onClick={handleRemove}
            className={styles.removeButton}
            aria-label={`Remover ${item.coffee.name} do carrinho`}
          >
            <Trash2 size={16} color="var(--color-purple)" />
            <span>Remover</span>
          </button>
        </div>
      </div>

      <span className={styles.itemPrice}>{formatCurrency(itemTotal)}</span>
    </div>
  );
}
