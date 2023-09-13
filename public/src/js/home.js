const tweetsContainer = document.querySelector('section');
const profilePic = document.querySelector('.profil-picture');

const tweetBox = async () => {
  let data = await fetch('/api/v1/users');
  let { user } = await data.json();
  profilePic.src = user.profile;
};

tweetBox();

const displayTweets = async () => {
  let tweets = await fetch('/api/v1/tweets');
  tweets.status === 401 ? window.location.replace('/') : null;
  tweets = await tweets.json();
  let likes = await fetch('/api/v1/tweets/likes', {
    method: 'POST',
  });
  likes = await likes.json();
  tweetsContainer.innerHTML = tweets
    .map(({ id, text, User: user, created, numOfLikes }) => {
      let liked = likes.find((tweet) => tweet.tweetId === id);
      return `
      <div class="tweet-wrap" data-id="${id}">
        <div class="tweet-header">
          <img src=${
            user.profile ? user.profile : './src/profiles/default_profile.png'
          } alt="" class="avator">
          <div class="tweet-header-info">
        
            ${user.name}
            ${
              user.official
                ? "<img class='blue-check' src='./src/images/Check Mark Badge.png' alt=''></img>"
                : ''
            }
            <span>@${user.username}</span>
            <span>. ${created}
            </span>
            <p class="test">${text}</p>
            </div>
            
            </div>
        <div class="tweet-info-counts">
          <div class='likes'>
    <svg
      class='feather feather-heart sc-dnqmqq jxshSx'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill=${liked ? 'red' : 'none'}
      stroke=${liked ? 'none' : 'black'}
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      aria-hidden='true'
    >
      <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
    </svg>
    <div class='likes-count'>${numOfLikes}</div>
  </div>
        </div>
      </div>
      
    `;
    })
    .join(' ');
  const likeBtns = tweetsContainer.querySelectorAll('.likes svg');
  likeBtns.forEach((likeBtn) => {
    const tweetId =
      likeBtn.parentElement.parentElement.parentElement.dataset.id;
    likeBtn.addEventListener('click', () => like(tweetId));
  });
};

const like = async (id) => {
  let isLiked = await fetch('/api/v1/tweets/likes', {
    method: 'POST',
    body: JSON.stringify({ tweetId: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  isLiked = await isLiked.json();
  console.log(isLiked);
  if (isLiked.length === 0) {
    const response = await fetch(`/api/v1/tweets/like/${id}`, {
      method: 'POST',
      body: JSON.stringify({ tweetId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    location.reload();
  } else {
    const response = await fetch(`/api/v1/tweets/like/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ tweetId: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    location.reload();
  }
};
displayTweets();

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
