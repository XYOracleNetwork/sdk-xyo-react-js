export interface FavoriteItemEvent {
  favorite?: boolean
  favoriteType?: FavoriteType
  favoriteValue?: string
  name?: string
}

export type FavoriteType = 'address' | 'schema' | 'hash'

export const generateFavoriteEvent = (favorite?: boolean, favoriteType?: FavoriteType, favoriteValue?: string, name?: string): FavoriteItemEvent => ({
  favorite: !!favorite,
  favoriteType,
  favoriteValue,
  name,
})
