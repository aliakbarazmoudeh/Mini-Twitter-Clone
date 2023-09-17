let params = new URLSearchParams(decodeURIComponent(window.location.search));
let UserId = params.get('user');
console.log(UserId);
