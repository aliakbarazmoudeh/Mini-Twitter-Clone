const like = async (id) => {
  let isLiked = await fetch('/api/v1/tweets/likes', {
    method: 'POST',
    body: JSON.stringify({ tweetId: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  isLiked = await isLiked.json();
  if (isLiked.length === 0) {
    const response = await fetch(`/api/v1/tweets/like/${id}`, {
      method: 'POST',
      body: JSON.stringify({ tweetId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    const response = await fetch(`/api/v1/tweets/like/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ tweetId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export default like;
