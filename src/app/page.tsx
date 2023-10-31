import getCurrentUser from './actions/getCurrentUser';
import getListings, { ListingsParams } from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import Categories from './components/navbar/Categories';

type HomeProps = {
  searchParams: ListingsParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const hasQuery = Object.values(searchParams).length > 0;
  const listings = await getListings(hasQuery ? searchParams : {});
  const currentUser = await getCurrentUser();

  return (
    <>
      <Categories />
      <Container>
        <div
          className='
            pt-6
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
          {listings.map((listing) => (
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
