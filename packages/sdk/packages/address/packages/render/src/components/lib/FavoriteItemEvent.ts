export interface FavoriteItemEvent {
  alias?: string
  favorite?: boolean
  favoriteType?: 'address' | 'schema' | 'hash'
  favoriteValue?: string
}
