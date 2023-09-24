const showUserPage = async (e) => {
  e.preventDefault();
  let [UserId, Follower] = e.target.dataset.id.split(';');
  let params = new URLSearchParams(window.location.search);
  params.set('user', UserId);
  Follower === UserId
    ? (location.href = '/profile.html')
    : (location.href = `/user.html?${encodeURIComponent(params)}`);
};

export default showUserPage;
