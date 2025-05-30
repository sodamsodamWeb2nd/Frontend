// 더미 예약 데이터 생성
export const generateDummyReservations = (count = 5) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    storeName: `가게 ${index + 1}`,
    date: new Date(
      Date.now() + (index + 1) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(),
    address: `서울시 강남구 테헤란로 ${index + 1}길`,
    imageUrl: `https://picsum.photos/200/200?random=${index + 1}`,
    isCancelled: false,
    isCancelling: false,
  }));
};

// 더미 리뷰 데이터 생성
export const generateDummyReviews = (count = 5) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    storeName: `가게 ${index + 1}`,
    date: new Date(
      Date.now() - (index + 1) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString(),
    address: `서울시 강남구 테헤란로 ${index + 1}길`,
    imageUrl: `https://picsum.photos/200/200?random=${index + 10 + 1}`,
    content: `이 가게는 정말 좋았습니다. 음식도 맛있고 서비스도 훌륭했어요! ${index + 1}`,
    isReviewed: false,
    isWriting: false,
  }));
};
