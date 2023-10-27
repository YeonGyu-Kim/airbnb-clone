import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from '../components/trips/TripsClient';

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
  }
  return (
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    ></TripsClient>
  );
}
