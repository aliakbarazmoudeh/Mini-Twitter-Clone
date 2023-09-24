const follow = async (id, DOM) => {
  const isFollowedResponse = await fetch(`/api/v1/users/follow/${id}`);
  const { isFollowed } = await isFollowedResponse.json();
  const response = await fetch('/api/v1/users/follow', {
    method: isFollowed ? 'DELETE' : 'POST',
    body: JSON.stringify({ id: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = DOM.textContent;
  status === 'Follow'
    ? (DOM.textContent = 'UnFollow')
    : (DOM.textContent = 'Follow');
};

export default follow;
