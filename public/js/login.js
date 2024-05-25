const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  console.log('xyz');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
