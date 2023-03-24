export interface FavoriteItemEvent {
  alias?: string
  favorite?: boolean
  favoriteType?: FavoriteType
  favoriteValue?: string
}

export type FavoriteType = 'address' | 'schema' | 'hash'

export const generateFavoriteEvent = (
  alias?: string,
  favorite?: boolean,
  favoriteType?: FavoriteType,
  favoriteValue?: string,
): FavoriteItemEvent => ({
  alias,
  favorite: !!favorite,
  favoriteType,
  favoriteValue,
})
