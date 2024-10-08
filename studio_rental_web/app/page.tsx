export const dynamic = 'force-dynamic'

import getCurrentUser from '@/app/actions/getCurrentUser'
import { ClientOnly } from './components/ClientOnly'
import EmptyState from './components/navbar/EmptyState'
import getListings, { ListingParams } from './actions/getListing'
import Container from './components/Container'
import ListingCard from './components/listings/ListingCard'

interface HomeProps {
  searchParams: ListingParams
}

const Home = async ({ searchParams }: HomeProps) => {
  console.log('🚀 ~ file: page.tsx:13 ~ Home ~ searchParams:', searchParams)
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className='
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          '
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home