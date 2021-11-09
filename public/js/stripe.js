import axios from 'axios';

const stripe = Stripe(
  'sk_test_51HqFfvAc2MU4pe32F9CpH0bLb95uQpMUxw57pwIDiPsHpLwubOg4jyJFbLn6ZV5jOzbrxHELN6wrG2OdgLrx1aYk00729SQpwD'
);

export const bookTour = async (tourId) => {
  // 1) Get the checkout session from the server
  const session = await axios(``);

  // 2) Use stripe object to create the checkout form plus charge the bank card
};
