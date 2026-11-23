import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Coffee } from '../../types';
import { useCart } from '../../hooks/useCart';
import { QuantityInput } from '../QuantityInput';
import { formatPriceWithoutCurrency } from '../../utils/currency';
import styles from './styles.module.css';

interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleAddToCart() {
    addToCart(coffee, quantity);
    setIsAdded(true);
    setQuantity(1);

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  }

  return (
    <article className={styles.card} data-testid={`coffee-card-${coffee.id}`}>
      <img src={coffee.image} alt={coffee.name} className={styles.coffeeImage} />

      <div className={styles.tags}>
        {coffee.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <h3 className={styles.name}>{coffee.name}</h3>
      <p className={styles.description}>{coffee.description}</p>

      <footer className={styles.cardFooter}>
        <div className={styles.price}>
          R$ <span>{formatPriceWithoutCurrency(coffee.priceInCents)}</span>
        </div>

        <div className={styles.actions}>
          <QuantityInput
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <button
            type="button"
            onClick={handleAddToCart}
            className={`${styles.cartButton} ${isAdded ? styles.added : ''}`}
            aria-label={isAdded ? 'Item adicionado ao carrinho' : `Adicionar ${coffee.name} ao carrinho`}
            title={isAdded ? 'Adicionado!' : 'Adicionar ao carrinho'}
          >
            {isAdded ? <Check size={20} strokeWidth={2.5} /> : <ShoppingCart size={20} fill="currentColor" />}
          </button>
        </div>
      </footer>
    </article>
  );
}
