import getCurrentUser from './actions/getCurrentUser';
import getListings from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import Categories from './components/navbar/Categories';

export default async function Home() {
  const { listings } = await getListings();
  const currentUser = await getCurrentUser();

  return (
    <>
      <Categories />
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

        {listings.length === 0 && <EmptyState showReset />}
      </Container>
    </>
  );
}
