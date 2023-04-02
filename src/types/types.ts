export type SortOrderType = 'up' | 'down';
export type SortPropertyType = 'rating' | 'price' | '';

export type UserType = {
  email: string;
};
export type FavoriteType = {
  hotel: HotelTypes;
  checkIn: string;
  checkOut: string;
};

export type FiltersType = {
  location: string;
  checkIn: string;
  checkOut: string;
};
export type HotelTypes = {
  stars: number;
  priceAvg: number;
  hotelName: string;
  hotelId: number;
};
