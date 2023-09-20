import { displayTweets } from './home.js';

const tweetBtn = document.querySelector('.tweet-btn');
const tweetText = document.querySelector('.tweet_box-input input');
const tweetsContainer = document.querySelector('section');

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
  tweetText.value = '';
  displayTweets();
});
