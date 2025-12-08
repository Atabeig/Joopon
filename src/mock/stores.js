import digikalaPoster from '../assets/images/stores/Digikala_Poster.jpg';
import shilaPoster from '../assets/images/stores/Shila_Poster.jpg';
import khanumiPoster from '../assets/images/stores/Khanumi_Poster.jpg';
import iranKetabPoster from '../assets/images/stores/Iranketab_Poster.jpg';
import sdfPoster from '../assets/images/stores/SDF_Poster.jpg';
import tiwallPoster from '../assets/images/stores/Tiwall_Poster.jpg';
import giftaccPoster from '../assets/images/stores/Giftacc_Poster.jpg';
import janebiPoster from '../assets/images/stores/Janebi_Poster.jpg';
import tapsiPoster from '../assets/images/stores/Tapsi_Poster.jpg';

import digikalaLogo from '../assets/images/Logos/digikala_logo.svg';
import shilaLogo from '../assets/images/Logos/shila_logo.svg';
import khanumiLogo from '../assets/images/Logos/khanumi_logo.svg';
import iranKetabLogo from '../assets/images/Logos/Iranketab_logo.svg';
import sdpLogo from '../assets/images/Logos/SDF_logo.svg';
import tiwallLogo from '../assets/images/Logos/tiwall_logo.svg';
import giftaccLogo from '../assets/images/Logos/giftac_logo.svg';
import janebiLogo from '../assets/images/Logos/janebi_logo.svg';
import tapsiLogo from '../assets/images/Logos/tapsishop_logo.svg';

// Placeholder image for stores without actual images
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EStore Image%3C/text%3E%3C/svg%3E';

const placeholderLogo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f5f5f5" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3ELogo%3C/text%3E%3C/svg%3E';

export const stores = [
  {
    id: 1,
    urlSlug: 'دیجی‌کالا',
    displayName: 'دیجی‌کالا',
    posterImage: digikalaPoster,
    logo: digikalaLogo,
  },
  {
    id: 2,
    urlSlug: 'شیلا',
    displayName: 'شیلا',
    posterImage: shilaPoster,
    logo: shilaLogo,
  },
  {
    id: 3,
    urlSlug: 'خانومی',
    displayName: 'خانومی',
    posterImage: khanumiPoster,
    logo: khanumiLogo,
  },
  {
    id: 4,
    urlSlug: 'ایران‌کتاب',
    displayName: 'ایران‌کتاب',
    posterImage: iranKetabPoster,
    logo: iranKetabLogo,
  },
  {
    id: 5,
    urlSlug: 'اس‌دی‌پی',
    displayName: 'اس‌دی‌پی',
    posterImage: sdfPoster,
    logo: sdpLogo,
  },
  {
    id: 6,
    urlSlug: 'تیوال',
    displayName: 'تیوال',
    posterImage: tiwallPoster,
    logo: tiwallLogo,
  },
  {
    id: 7,
    urlSlug: 'گیفتک',
    displayName: 'گیفتک',
    posterImage: giftaccPoster,
    logo: giftaccLogo,
  },
  {
    id: 8,
    urlSlug: 'جانبی',
    displayName: 'جانبی',
    posterImage: janebiPoster,
    logo: janebiLogo,
  },
  {
    id: 9,
    urlSlug: 'تپسی‌شاپ',
    displayName: 'تپسی‌شاپ',
    posterImage: tapsiPoster,
    logo: tapsiLogo,
  },
];
