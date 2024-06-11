const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'something went wrong try again');
  }
};
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      location.reload(true);
      showAlert('success', 'logged out successfully');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'something went wrong try again');
  }
};
const form = document.querySelector('.form--login');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(password, email);
    login(email, password);
  });
}
const logoutBtn = document.querySelector('.nav__el--logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
const signupForm = document.querySelector('.form--signup');
if (signupForm) {
  // Getting name, email and password from "/signup" form
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    signup(name, email, password, passwordConfirm);
  });
}
const signup = async (name, email, password, passwordConfirm) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (response.data.status === 'success') {
      showAlert('success', 'Account created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

const userDataForm = document.querySelector('.form-user-data');
if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}
const updateSettings = async (data, type) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data
    });

    if (response.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
    location.reload();
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
const submitReview = document.querySelector('.add-review');
if (submitReview) {
  submitReview.addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]').value;
    const reviewData = {
      review: reviewText,
      rating: parseInt(rating)
    };
    console.log();
    const id = document.querySelector('.review-input').dataset.id;
    const url = `/api/v1/tours/${id}/review`;
    console.log(url, reviewData);
    axios
      .post(url, reviewData)
      .then(response => {
        console.log('Success:', response.data);
        // Clear input fields after successful submission
        document.getElementById('reviewText').value = '';
        document.querySelector('input[name="rating"]').value = '';
        showAlert('success', 'added the review');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}
