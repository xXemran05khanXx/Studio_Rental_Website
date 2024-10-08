'use client'

import { SafeListing, SafeUser } from '../types'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import React from 'react'
import Container from '../components/Container'
import Heading from '../components/modals/Heading'
import ListingCard from '../components/listings/ListingCard'


type ClientTripsProps = {
  listings?: SafeListing[]
  currentUser: SafeUser | null
}
export const ClientProperties: React.FC<ClientTripsProps> = ({
  currentUser,
  listings,
}) => {
  const [deletingId, setDeletingId] = React.useState('')
  const router = useRouter()

  const handleCancelReservation = React.useCallback(
    (id: string) => {
      setDeletingId(id)
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Property removed!')
          router.refresh()
        })
        .catch(() => {
          toast.error('Remove property error!')
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <div className='gap-8 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings?.map((l) => (
          <ListingCard
            key={l.id}
            data={l}
            actionId={l.id}
            onAction={handleCancelReservation}
            disabled={deletingId === l.id}
            actionLabel='Remove'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}