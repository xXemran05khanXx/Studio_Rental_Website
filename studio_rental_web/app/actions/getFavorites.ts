import Prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites = await Prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))

    return safeFavorites
  } catch (error: unknown) {
    console.error(`Error fetching favorites: ${error}`)
  }
}