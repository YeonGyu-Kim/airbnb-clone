import { getCat } from '@/data/catApi';
import getCurrentUser from './actions/getCurrentUser';
import getListings, { ListingsParams } from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';
import ListingCardTest from './components/listings/ListingCardTest';
import ListingContainer from './components/listings/ListingContainer';
import Categories from './components/navbar/Categories';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import Cat from './components/Cat';

type HomeProps = {
  searchParams: ListingsParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const hasQuery = Object.values(searchParams).length > 0;
  const listings = await getListings(hasQuery ? searchParams : {});
  const currentUser = await getCurrentUser();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['listings'],
    queryFn: () => getListings(hasQuery ? searchParams : {}),
  });

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

          {/*
            react query와 sever action 사용하여 ssr
           */}
          {/*  <HydrationBoundary state={dehydrate(queryClient)}>
            <ListingCardTest />
          </HydrationBoundary> */}

          {/*
            클라이언트 컴포넌트 안에 서버 컴포넌트를 사용하고 싶다면
            클라이언트 컴포넌트에 children props로 전달한다.
           */}
          {/* <ListingCardTest>
            <Cat />
          </ListingCardTest> */}

          {/* <ListingContainer currentUser={currentUser} listings={listings} /> */}
        </div>

        {listings.length === 0 && <EmptyState showReset />}
      </Container>
    </>
  );
}
