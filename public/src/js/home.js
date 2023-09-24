import createTweet from './utils/createTweet.js';
import displayTweets from './utils/displayTweets.js';
import searchUser from './utils/searchUser.js';

const profilePic = document.querySelector('.profil-picture'),
  asideInput = document.querySelector('.aside_input input'),
  tweetBtn = document.querySelector('.tweet-btn'),
  tweetText = document.querySelector('.tweet_box-input input');

window.addEventListener('load', async () => {
  let data = await fetch('/api/v1/users');
  let { user } = await data.json();
  profilePic.src = user.profile;
  let tweets = await fetch('/api/v1/tweets');
  tweets.status === 401 ? window.location.replace('/') : null;
  displayTweets();
});

asideInput.addEventListener('keyup', () => {
  searchUser();
});

tweetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createTweet(tweetText);
});

{
  /* <div class='tweet-info-counts'>
  <div class='comments'>
    <svg
      class='feather feather-message-circle sc-dnqmqq jxshSx'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
    </svg>
    <div class='comment-count'>33</div>
  </div>

  <div class='retweets'>
    <svg
      class='feather feather-repeat sc-dnqmqq jxshSx'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <polyline points='17 1 21 5 17 9'></polyline>
      <path d='M3 11V9a4 4 0 0 1 4-4h14'></path>
      <polyline points='7 23 3 19 7 15'></polyline>
      <path d='M21 13v2a4 4 0 0 1-4 4H3'></path>
    </svg>
    <div class='retweet-count'>397</div>
  </div>

  <div class='likes'>
    <svg
      class='feather feather-heart sc-dnqmqq jxshSx'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
    </svg>
    <div class='likes-count'>2.6k</div>
  </div>

  <div class='message'>
    <svg
      class='feather feather-send sc-dnqmqq jxshSx'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <line x1='22' y1='2' x2='11' y2='13'></line>
      <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
    </svg>
  </div>
</div>; */
}
