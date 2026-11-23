import { Coffee } from '../types';

import expressoTradicional from '../assets/coffees/expresso-tradicional.svg';
import expressoAmericano from '../assets/coffees/expresso-americano.svg';
import expressoCremoso from '../assets/coffees/expresso-cremoso.svg';
import expressoGelado from '../assets/coffees/expresso-gelado.svg';
import cafeComLeite from '../assets/coffees/cafe-com-leite.svg';
import latte from '../assets/coffees/latte.svg';
import capuccino from '../assets/coffees/capuccino.svg';
import macchiato from '../assets/coffees/macchiato.svg';
import mocaccino from '../assets/coffees/mocaccino.svg';
import chocolateQuente from '../assets/coffees/chocolate-quente.svg';
import cubano from '../assets/coffees/cubano.svg';
import havaiano from '../assets/coffees/havaiano.svg';
import arabe from '../assets/coffees/arabe.svg';
import irlandes from '../assets/coffees/irlandes.svg';

export const coffees: Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoTradicional,
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoAmericano,
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoCremoso,
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    tags: ['tradicional', 'gelado'],
    priceInCents: 990,
    image: expressoGelado,
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: cafeComLeite,
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: latte,
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: capuccino,
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: macchiato,
  },
  {
    id: 'mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: mocaccino,
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    tags: ['especial', 'com leite'],
    priceInCents: 990,
    image: chocolateQuente,
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tags: ['especial', 'alcoólico', 'gelado'],
    priceInCents: 990,
    image: cubano,
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tags: ['especial'],
    priceInCents: 990,
    image: havaiano,
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tags: ['especial'],
    priceInCents: 990,
    image: arabe,
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tags: ['especial', 'alcoólico'],
    priceInCents: 990,
    image: irlandes,
  },
];
