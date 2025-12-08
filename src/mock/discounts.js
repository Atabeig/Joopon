import shilaPoster from '../assets/images/stores/Shila_Poster.jpg';
import khanumiPoster from '../assets/images/stores/Khanumi_Poster.jpg';
import iranKetabPoster from '../assets/images/stores/Iranketab_Poster.jpg';
import digikalaPoster from '../assets/images/stores/Digikala_Poster.jpg';
import sdfPoster from '../assets/images/stores/SDF_Poster.jpg';
import tiwallPoster from '../assets/images/stores/Tiwall_Poster.jpg';
import giftaccPoster from '../assets/images/stores/Giftacc_Poster.jpg';
import janebiPoster from '../assets/images/stores/Janebi_Poster.jpg';
import tapsiPoster from '../assets/images/stores/Tapsi_Poster.jpg';

import shilaLogo from '../assets/images/Logos/shila_logo.svg';
import khanumiLogo from '../assets/images/Logos/khanumi_logo.svg';
import iranKetabLogo from '../assets/images/Logos/Iranketab_logo.svg';
import digikalaLogo from '../assets/images/Logos/digikala_logo.svg';
import sdpLogo from '../assets/images/Logos/SDF_logo.svg';
import tiwallLogo from '../assets/images/Logos/tiwall_logo.svg';
import giftaccLogo from '../assets/images/Logos/giftac_logo.svg';
import janebiLogo from '../assets/images/Logos/janebi_logo.svg';
import tapsiLogo from '../assets/images/Logos/tapsishop_logo.svg';

import { stores } from './stores';


const generateDiscounts = () => {
  const storeImages = {
    'دیجی‌کالا': { image: digikalaPoster, logo: digikalaLogo },
    'شیلا': { image: shilaPoster, logo: shilaLogo },
    'خانومی': { image: khanumiPoster, logo: khanumiLogo },
    'ایران‌کتاب': { image: iranKetabPoster, logo: iranKetabLogo },
    'اس‌دی‌پی': { image: sdfPoster, logo: sdpLogo },
    'تیوال': { image: tiwallPoster, logo: tiwallLogo },
    'گیفتک': { image: giftaccPoster, logo: giftaccLogo },
    'جانبی': { image: janebiPoster, logo: janebiLogo },
    'تپسی‌شاپ': { image: tapsiPoster, logo: tapsiLogo },
  };

  const storeCategories = {
    'دیجی‌کالا': 'تکنولوژی و دیجیتال',
    'شیلا': 'غذا و نوشیدنی',
    'ایران‌کتاب': 'آموزش',
    'خانومی': 'زیبایی و سلامت',
    'اس‌دی‌پی': 'تکنولوژی و دیجیتال',
    'تیوال': 'سرگرمی',
    'گیفتک': 'سرگرمی',
    'جانبی': 'تکنولوژی و دیجیتال',
    'تپسی‌شاپ': 'تکنولوژی و دیجیتال',
  };

  const discountsList = [];
  let discountId = 1;

  stores.forEach((store) => {

    const mockStoreDetails = {
      'دیجی‌کالا': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: 'تا ۴۰ درصد تخفیف' },
          { type_id: 2, type: 'first_purchase', description: 'تخفیف ویژه برای خریداران جدید' }
        ]
      },
      'شیلا': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: 'تا ۴۰ درصد تخفیف' }
        ]
      },
      'خانومی': {
        discountTypes: [
          { type_id: 1, type: 'first_purchase', description: 'تا ۲۵ درصد تخفیف خرید اول' }
        ]
      },
      'ایران‌کتاب': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: '۲۰ درصد تخفیف تمامی کتاب‌ها' }
        ]
      },
      'اس‌دی‌پی': {
        discountTypes: [
          { type_id: 1, type: 'first_purchase', description: '۲۰ درصد تخفیف خرید اول' }
        ]
      },
      'تیوال': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: 'تا ۴۰ درصد تخفیف بلیط تئاتر' }
        ]
      },
      'گیفتک': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: 'تا ۳۵ درصد تخفیف' }
        ]
      },
      'جانبی': {
        discountTypes: [
          { type_id: 1, type: 'first_purchase', description: '۲۵ درصد تخفیف خرید اول' }
        ]
      },
      'تپسی‌شاپ': {
        discountTypes: [
          { type_id: 1, type: 'percentage', description: 'تا ۳۰ درصد تخفیف' }
        ]
      }
    };

    const storeData = mockStoreDetails[store.displayName];
    if (storeData && storeData.discountTypes) {
      storeData.discountTypes.forEach((discountType) => {
        const storeImages_data = storeImages[store.displayName];
        discountsList.push({
          id: `discount-${discountId}`,
          image: storeImages_data?.image,
          discountText: discountType.description,
          storeName: store.displayName,
          type: discountType.type,
          categories: [storeCategories[store.displayName]],
          logo: storeImages_data?.logo,
        });
        discountId++;
      });
    }
  });

  return discountsList;
};

export const discounts = generateDiscounts();
