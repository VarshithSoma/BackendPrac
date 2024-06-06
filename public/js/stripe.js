const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51POcD7SCLcqjEKvKaSn7SXAyAqInYNiMYLZ7mgnom5D5aJBwcV8HJj9ePOScFvfxR5TvnITnG5Y1w803qygiEUVu00UVmRsXwv'
  );
  const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
  console.log(session);
};
const bookBtn = document.getElementById('book-tour');
if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing... ';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
