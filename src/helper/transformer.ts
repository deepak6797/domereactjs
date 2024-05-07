import { getValue } from '../utils/object';

export const tranformMenuCategories = (categories: any[]) =>
  categories.map((data) => {
    return {
      title: getValue(data, 'name'),
      value: getValue(data, '_id'),
    };
  });

export const transformRestaurantTable = (tables: any[]) =>
  tables.map((data) => {
    return {
      title: getValue(data, 'name'),
      value: getValue(data, '_id'),
    };
  });
