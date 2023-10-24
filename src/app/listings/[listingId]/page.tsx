import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ListingClient from '@/app/components/listings/ListingClient';

type Params = {
  listingId?: string;
};

export default async function ListingPage({ params }: { params: Params }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return;
  }

  return (
    <ListingClient listing={listing} currentUser={currentUser}></ListingClient>
  );
}
