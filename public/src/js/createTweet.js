const tweetBtn = document.querySelector('.tweet-btn');
const tweetText = document.querySelector('.tweet_box-input input');
const tweetsContainer = document.querySelector('section');

const socket = io();
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
  const result = await response.json();
  let tweets = await fetch('/api/v1/tweets');
  socket.on('temp', ({ tweets }) => {
    console.log(tweets);
    tweetsContainer.innerHTML = tweets
      .map(({ id, text, User: user, created, numOfLikes }) => {
        let liked = null;
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
  });
  // window.location.reload('/twitter.html');
});
