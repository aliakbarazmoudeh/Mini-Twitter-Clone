import displayTweets from './displayTweets.js';

const createTweet = async (DOM) => {
  const Body = { text: DOM.value };
  const response = await fetch('/api/v1/tweets', {
    method: 'POST',
    body: JSON.stringify(Body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  DOM.value = '';
  displayTweets();
};

export default createTweet;
