import { topCategories } from '../mock/categories.js';
import {
  dashboardStats,
  salesTrend,
  topMerchants,
} from '../mock/analytics.js';
import { discounts } from '../mock/discounts.js';
import { stores } from '../mock/stores.js';

const clone = (data) => JSON.parse(JSON.stringify(data));

const simulateRequest = async (data, delay = 200) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(clone(data)), delay);
  });

export const getTopCategories = () => simulateRequest(topCategories);

export const getDashboardStats = () => simulateRequest(dashboardStats);

export const getSalesTrend = () => simulateRequest(salesTrend);

export const getTopMerchants = () => simulateRequest(topMerchants);

export const getDiscounts = () => simulateRequest(discounts);

// دریافت اطلاعات فروشگاه بر اساس URL slug
export const getStoreDetails = (urlSlug) => {
  // داده‌های درخواستی از backend (فعلاً mock است)
  const mockStoreDetails = {
    'دیجی‌کالا': {
      shop_id: 1,
      urlSlug: 'دیجی‌کالا',
      displayName: 'دیجی‌کالا',
      tagline: 'تخفیف دانشجویی دیجی‌کالا',
      slogan: 'لبخند به خانه می‌رسد',
      description: 'ماموریت این است که با بهره‌گیری از فناوری، تجربه‌های خرید لذت‌بخش برای مشتریان و تجربه‌های فروش موفق برای فروشندگان ایجاد کند. هدف شرکت کمک به کسب‌وکارهای ایرانی است تا از فناوری برای فروش بهتر استفاده کنند و همچنین در گذار از اقتصاد سنتی به اقتصاد دیجیتال یاری‌گر باشند.',
      category: 'تکنولوژی و دیجیتال',
      discountTypes: [
        {
          type_id: 1,
          type: 'percentage',
          description: 'تا ۴۰ درصد تخفیف',
          code: 'DKPS690B155AA561F',
          usageTerms: 'کد یک بار مصرف\nویژه همه دسته‌بندی‌ها جز کالاهای شگفت‌انگیز\nو ارسال فروشنده\nحداقل خرید ۷۰۰ هزارتومان\nاعتبار تا ۳۰ آذر'
        },
        {
          type_id: 2,
          type: 'first_purchase',
          description: 'تخفیف ویژه برای خریداران جدید',
          code: 'DKNEW500FIRST',
          usageTerms: 'کد یک بار مصرف\nفقط برای خریداران جدید\nحداقل خرید ۵۰۰ هزارتومان\nاعتبار تا ۳۰ آذر'
        }
      ]
    },
    'شیلا': {
      shop_id: 2,
      urlSlug: 'شیلا',
      displayName: 'شیلا',
      tagline: 'تخفیف دانشجویی شیلا',
      slogan: 'لبخند به خانه می‌رسد',
      description: 'ماموریت این است که با بهره‌گیری از فناوری، تجربه‌های خرید لذت‌بخش برای مشتریان و تجربه‌های فروش موفق برای فروشندگان ایجاد کند. هدف شرکت کمک به کسب‌وکارهای ایرانی است تا از فناوری برای فروش بهتر استفاده کنند و همچنین در گذار از اقتصاد سنتی به اقتصاد دیجیتال یاری‌گر باشند.',
      category: 'غذا و نوشیدنی',
      discountTypes: [
        {
          type_id: 1,
          type: 'percentage',
          description: 'تا ۴۰ درصد تخفیف',
          code: 'SHILA40OFF',
          usageTerms: 'کد یک بار مصرف\nویژه تمام محصولات\nحداقل خرید ۵۰ هزارتومان\nاعتبار تا ۳۰ آذر'
        }
      ]
    },
    'خانومی': {
      shop_id: 3,
      urlSlug: 'خانومی',
      displayName: 'خانومی',
      tagline: 'تخفیف دانشجویی خانومی',
      slogan: 'لبخند به خانه می‌رسد',
      description: 'ماموریت این است که با بهره‌گیری از فناوری، تجربه‌های خرید لذت‌بخش برای مشتریان و تجربه‌های فروش موفق برای فروشندگان ایجاد کند. هدف شرکت کمک به کسب‌وکارهای ایرانی است تا از فناوری برای فروش بهتر استفاده کنند و همچنین در گذار از اقتصاد سنتی به اقتصاد دیجیتال یاری‌گر باشند.',
      category: 'زیبایی و سلامت',
      discountTypes: [
        {
          type_id: 1,
          type: 'first_purchase',
          description: 'تا ۲۵ درصد تخفیف خرید اول',
          code: 'KHANUMI25NEW',
          usageTerms: 'کد یک بار مصرف\nفقط برای خریداران جدید\nحداقل خرید ۵۰۰ هزارتومان\nاعتبار تا ۳۰ آذر'
        }
      ]
    },
    'ایران‌کتاب': {
      shop_id: 4,
      urlSlug: 'ایران‌کتاب',
      displayName: 'ایران‌کتاب',
      tagline: 'تخفیف دانشجویی ایران‌کتاب',
      slogan: 'لبخند به خانه می‌رسد',
      description: 'ماموریت این است که با بهره‌گیری از فناوری، تجربه‌های خرید لذت‌بخش برای مشتریان و تجربه‌های فروش موفق برای فروشندگان ایجاد کند. هدف شرکت کمک به کسب‌وکارهای ایرانی است تا از فناوری برای فروش بهتر استفاده کنند و همچنین در گذار از اقتصاد سنتی به اقتصاد دیجیتال یاری‌گر باشند.',
      category: 'کتاب و آموزش',
      discountTypes: [
        {
          type_id: 1,
          type: 'percentage',
          description: '۲۰ درصد تخفیف تمامی کتاب‌ها',
          code: 'IRANBOOK20',
          usageTerms: 'کد یک بار مصرف\nویژه تمام کتاب‌ها\nحداقل خرید ۲۰۰ هزارتومان\nاعتبار تا ۳۰ آذر'
        }
      ]
    }
  };
  
  const storeDetail = mockStoreDetails[urlSlug];
  return simulateRequest(storeDetail || null, 300);
};

export const api = {
  getTopCategories,
  getDashboardStats,
  getSalesTrend,
  getTopMerchants,
  getDiscounts,
  getStoreDetails,
};
