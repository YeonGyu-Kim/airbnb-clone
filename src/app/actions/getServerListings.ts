'use server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { FieldValues } from 'react-hook-form';
import { revalidatePath } from 'next/cache';

export default async function getServerListings(body: FieldValues) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return console.error();
  }

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      console.error();
    }
  });

  try {
    await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
  } catch (e: any) {
    return {
      error: e.message ? String(e.message) : 'Something went wrong',
    };
  } finally {
    revalidatePath('/');
  }
}
