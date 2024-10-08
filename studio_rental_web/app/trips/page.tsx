import EmptyState from "../components/navbar/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


const TripPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
              title="Unathorized"
              subtitle="Please Login"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
      });
      
      if (reservations.length === 0) {
        return (

            <EmptyState
              title="No trips found"
              subtitle="Looks like you haven't reserved any trips."
            />

        );
      }
      
      return (

          <TripsClient
            reservations={reservations}
            currentUser={currentUser}
          />

      );
      
}

export default TripPage