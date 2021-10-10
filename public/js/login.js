/* eslint-disable */

// const login = async function (email, password) {
//   try {
//     const url = 'http://127.0.0.1:3000/api/v1/users/login';
//     const data = { email, password };
//     const options = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     };
//     console.log(options.body);
//     const res = await fetch(url, options);
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/login',
      data: { email, password },
    });
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
