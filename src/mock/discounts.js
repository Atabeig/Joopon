import shilaPoster from '../assets/images/stores/Shila_Poster.jpg';
import khanumiPoster from '../assets/images/stores/Khanumi_Poster.png';
import iranKetabPoster from '../assets/images/stores/Iranketab_Poster.png';
import digikalaPoster from '../assets/images/stores/Digikala_Poster.jpg';

import shilaLogo from '../assets/images/Logos/shila_logo.svg';
import khanumiLogo from '../assets/images/Logos/khanumi_logo.svg';
import iranKetabLogo from '../assets/images/Logos/Iranketab_logo.svg';
import digikalaLogo from '../assets/images/Logos/digikala_logo.svg';

export const discounts = [
  {
    id: 'discount-shila',
    image: shilaPoster,
    discountText: 'تا ۴۰ درصد تخفیف',
    storeName: 'شیلا',
    categories: ['غذا و نوشیدنی', 'دانشجویی'],
    logo: shilaLogo,
  },
  {
    id: 'discount-khanumi',
    image: khanumiPoster,
    discountText: 'تا ۲۵ درصد تخفیف خرید اول',
    storeName: 'خانومی',
    categories: ['زیبایی و سلامت', 'آنلاین'],
    logo: khanumiLogo,
  },
  {
    id: 'discount-iranketab',
    image: iranKetabPoster,
    discountText: '۲۰ درصد تخفیف تمامی کتاب‌ها',
    storeName: 'ایران‌کتاب',
    categories: ['آموزش', 'کتاب'],
    logo: iranKetabLogo,
  },
  {
    id: 'discount-digikala',
    image: digikalaPoster,
    discountText: '۱۰ درصد تخفیف کالاهای دیجیتال',
    storeName: 'دیجی‌کالا',
    categories: ['تکنولوژی', 'دیجیتال'],
    logo: digikalaLogo,
  }
];
