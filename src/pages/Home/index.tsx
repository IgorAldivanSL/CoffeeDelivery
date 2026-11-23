import { ShoppingCart, Package, Timer, Coffee as CoffeeIcon } from 'lucide-react';
import heroImage from '../../assets/illustrations/hero-coffee.svg';
import { coffees } from '../../data/coffees';
import { CoffeeCard } from '../../components/CoffeeCard';
import styles from './styles.module.css';

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection} aria-label="Apresentação do Coffee Delivery">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Encontre o café perfeito para qualquer hora do dia
          </h1>
          <p className={styles.heroSubtitle}>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
          </p>

          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-yellow-dark)' }}
                aria-hidden="true"
              >
                <ShoppingCart size={16} fill="currentColor" />
              </div>
              <span>Compra simples e segura</span>
            </div>

            <div className={styles.benefitItem}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-base-text)' }}
                aria-hidden="true"
              >
                <Package size={16} />
              </div>
              <span>Embalagem mantém o café intacto</span>
            </div>

            <div className={styles.benefitItem}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-yellow)' }}
                aria-hidden="true"
              >
                <Timer size={16} />
              </div>
              <span>Entrega rápida e rastreada</span>
            </div>

            <div className={styles.benefitItem}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: 'var(--color-purple)' }}
                aria-hidden="true"
              >
                <CoffeeIcon size={16} />
              </div>
              <span>O café chega fresquinho até você</span>
            </div>
          </div>
        </div>

        <img
          src={heroImage}
          alt="Copo de café especial com grãos de café e embalagens de entrega rápida"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.catalogSection} aria-label="Catálogo de cafés disponíveis">
        <header className={styles.catalogHeader}>
          <h2 className={styles.catalogTitle}>Nossos cafés</h2>
        </header>

        <div className={styles.coffeeGrid} data-testid="coffee-grid">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
    </div>
  );
}
