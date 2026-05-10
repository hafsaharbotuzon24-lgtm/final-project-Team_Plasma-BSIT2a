(function () {
  const h = window.location.hostname || '';
  const isLocal =
    h === 'localhost' ||
    h === '127.0.0.1' ||
    h === '[::1]' ||
    h === '';
  window.API_BASE_URL = isLocal
    ? 'http://localhost:5000'
    : 'https://combat-coders-team-plasma.onrender.com';
})();
