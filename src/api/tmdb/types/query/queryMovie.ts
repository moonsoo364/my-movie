export type MovieSearchQuery = {
  query: string // 필수
  include_adult?: boolean // 기본값: false
  language?: string // 기본값: 'en-US'
  primary_release_year?: string
  page?: number // 기본값: 1
  region?: string
  year?: string
}
