import React from 'react'
import { ClientOnly } from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'

import { ClientProperties } from './ClientProperties'
import EmptyState from '../components/navbar/EmptyState'
import getListings from '../actions/getListing'


export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }
  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found.'
          subtitle='Looks like you have no properties.'
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ClientProperties listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}