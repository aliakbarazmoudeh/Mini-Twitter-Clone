const tweetBtn = document.querySelector('.tweet-btn');
const tweetText = document.querySelector('.tweet_box-input input');

tweetBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const Body = { text: tweetText.value };
  const response = await fetch('/api/v1/tweets', {
    method: 'POST',
    body: JSON.stringify(Body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  window.location.reload('/twitter.html');
});
