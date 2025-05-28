export const DUMMY_PLACE = {
  storeName: '공주대학교 천안공과대학',
  address: '천안시 서북구 대학로 100',
  imageUrl: null,
  date: '2025-05-02',
};

export const DUMMY_REVIEW = {
  userId: 'user1302382',
  content: '너무 맛있어요',
  rating: 5,
};

export const generateDummyReservations = (count = 6) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    ...DUMMY_PLACE,
    isCancelling: false,
  }));
};

export const generateDummyReviews = (count = 2) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    ...DUMMY_PLACE,
    ...DUMMY_REVIEW,
    isReviewed: false,
    isWriting: false,
  }));
};
