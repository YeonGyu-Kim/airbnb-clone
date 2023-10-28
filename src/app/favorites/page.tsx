import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import EmptyState from '../components/EmptyState';
import FavoritesClient from '../components/favorites/FavoritesClient';

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;

  const listings = await getFavoriteListings();

  if (listings?.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Look like you have no favorite listings'
      />
    );
  }

  return (
    <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    ></FavoritesClient>
  );
}
