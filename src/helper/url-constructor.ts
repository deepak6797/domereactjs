import { BASE_URL } from '../constant/common';

export const getCompleteImageUrl = (imageUrl: string) =>
  `${BASE_URL}/${imageUrl}`;
