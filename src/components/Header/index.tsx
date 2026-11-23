import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart, Sun, Moon } from 'lucide-react';
import logoImg from '../../assets/brand/logo.svg';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import styles from './styles.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { itemsTotalCount } = useCart();

  return (
    <header className={styles.headerContainer}>
      <Link to="/" aria-label="Página inicial do Coffee Delivery">
        <img src={logoImg} alt="Coffee Delivery Logo" className={styles.logo} />
      </Link>

      <div className={styles.actions}>
        <div className={styles.locationBadge} title="Sua localização atual">
          <MapPin size={20} color="var(--color-purple)" />
          <span>Porto Alegre, RS</span>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} color="var(--color-yellow)" />}
        </button>

        <Link
          to="/checkout"
          className={styles.cartButton}
          aria-label={`Carrinho de compras com ${itemsTotalCount} ${itemsTotalCount === 1 ? 'item' : 'itens'}`}
          title="Ver carrinho de compras"
        >
          <ShoppingCart size={22} fill="currentColor" />
          {itemsTotalCount > 0 && (
            <span className={styles.cartBadge} data-testid="cart-badge">
              {itemsTotalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
