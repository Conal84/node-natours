import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51HqFfvAc2MU4pe32X0icUyCYG9NE7oUfAdKRM1e5TZxk5m2TceFl0XEVrOKnzkCdXY4F8ts3Prh0XXl5rXX1oSBO00KgjmaTxQ'
    );

    // 1) Get the checkout session from the server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2) Use stripe object to create the checkout form plus charge the bank card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
