import { topCategories } from '../mock/categories.js';
import {
  dashboardStats,
  salesTrend,
  topMerchants,
} from '../mock/analytics.js';
import { discounts } from '../mock/discounts.js';

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

export const api = {
  getTopCategories,
  getDashboardStats,
  getSalesTrend,
  getTopMerchants,
  getDiscounts,
};
