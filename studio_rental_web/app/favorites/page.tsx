import getCurrentUser from '@/app/actions/getCurrentUser'
import getFavorites from '@/app/actions/getFavorites'
import { ClientOnly } from '../components/ClientOnly'
import EmptyState from '../components/navbar/EmptyState'
import FavoritesClient from './FavoritesClient'



const ListingPage = async () => {
  const listings = await getFavorites()
  const currentUser = await getCurrentUser()

  
  if (!listings) {
    return (
      <ClientOnly>
        <EmptyState
          title='Something went wrong!'
          subtitle='Please try to refresh the page. If error persists, contact site administrator.'
        />
      </ClientOnly>
    )
  }

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorite listings'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListingPage