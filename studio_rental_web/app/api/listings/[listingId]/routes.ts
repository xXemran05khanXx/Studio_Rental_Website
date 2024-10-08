import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import Prisma from '@/app/libs/prismadb'

type Params = {
  listingId?: string
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    console.error('User not found!')
    return NextResponse.error()
  }
  const { listingId } = params
  if (!listingId || typeof listingId !== 'string') {
    console.error('Invalid listing ID')
    return NextResponse.error()
  }
  const listing = await Prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}