// movieGenre.ts

export const genreMap: Record<number, { name: string; color: string }> = {
  28: { name: 'Action', color: '#e74c3c' },        // 강렬한 붉은색 - 액션의 역동성과 긴장감
  12: { name: 'Adventure', color: '#f39c12' },     // 주황색 - 모험과 탐험의 에너지
  16: { name: 'Animation', color: '#9b59b6' },     // 보라색 - 상상력과 창의성
  35: { name: 'Comedy', color: '#f1c40f' },        // 밝은 노란색 - 유쾌함과 웃음
  80: { name: 'Crime', color: '#34495e' },         // 짙은 회청색 - 범죄의 어두운 분위기
  99: { name: 'Documentary', color: '#2ecc71' },   // 녹색 - 진실, 자연, 사실 기반 콘텐츠
  18: { name: 'Drama', color: '#7f8c8d' },         // 회색 - 인간 관계의 진지함과 복잡성
  10751: { name: 'Family', color: '#1abc9c' },     // 밝은 청록색 - 따뜻하고 포근한 가족 영화
  14: { name: 'Fantasy', color: '#8e44ad' },       // 짙은 보라색 - 마법과 상상의 세계
  36: { name: 'History', color: '#d35400' },       // 고동색 - 역사적 무게감
  27: { name: 'Horror', color: '#c0392b' },        // 진한 빨강 - 공포와 피, 긴장감
  10402: { name: 'Music', color: '#e67e22' },      // 주황색 - 음악의 활기와 리듬
  9648: { name: 'Mystery', color: '#2c3e50' },     // 어두운 청색 - 미스터리한 분위기
  10749: { name: 'Romance', color: '#e84393' },    // 분홍색 - 사랑과 감정
  878: { name: 'Science Fiction', color: '#2980b9' }, // 푸른색 - 미래와 과학의 차가움
  10770: { name: 'TV Movie', color: '#16a085' },   // 녹청색 - 일반 영화보다 가벼운 분위기
  53: { name: 'Thriller', color: '#e67e22' },      // 주황색 - 긴장감과 속도감
  10752: { name: 'War', color: '#95a5a6' },        // 연한 회색 - 전쟁의 차가운 현실감
  37: { name: 'Western', color: '#a0522d' },       // 갈색 - 황야, 카우보이, 서부 영화
}
