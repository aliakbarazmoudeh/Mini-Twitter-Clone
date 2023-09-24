import like from './like.js';
import likeDOM from './likeDOM.js';

const tweetsContainer = document.querySelector('section');

const displayTweets = async () => {
  let tweets = await fetch('/api/v1/tweets');
  tweets = await tweets.json();
  let likes = await fetch('/api/v1/tweets/likes', {
    method: 'POST',
  });
  likes = await likes.json();
  tweetsContainer.innerHTML = '';
  tweetsContainer.innerHTML = tweets
    .map(
      ({
        Follower,
        'followings.Tweets.id': id,
        'followings.Tweets.UserId': UserId,
        'followings.Tweets.text': text,
        'followings.official': official,
        'followings.name': name,
        'followings.username': username,
        'followings.Tweets.created': created,
        'followings.Tweets.numOfLikes': numOfLikes,
        'followings.profile': profile,
      }) => {
        if (text === null) {
          return;
        }
        let liked = likes.find((tweet) => tweet.tweetId === id);
        return `
      <div class="tweet-wrap" data-id="${id}">
        <div class="tweet-header">
          <img src=${
            profile ? profile : './src/profiles/default_profile.png'
          } alt="" class="avator" data-id="${UserId};${Follower}">
          <div class="tweet-header-info">

            ${name}
            ${
              official
                ? "<img class='blue-check' src='./src/images/Check Mark Badge.png' alt=''></img>"
                : ''
            }
            <span>@${username}</span>
            <span>. ${created}
            </span>
            <p class="test">${text}</p>
            </div>

            </div>
        <div class="tweet-info-counts">
          <div class='likes'>
    <svg
      class='feather feather-heart sc-dnqmqq jxshSx ${
        liked ? 'alreadyLiked' : 'notLiked'
      }'
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
      }
    )
    .join(' ');
  const likeBtns = tweetsContainer.querySelectorAll('.likes svg');
  const avators = tweetsContainer.querySelectorAll('.avator');
  avators.forEach((avator) => {
    avator.addEventListener('click', (e) => {
      showUserInfo(e);
    });
  });
  likeBtns.forEach((likeBtn) => {
    const tweetId =
      likeBtn.parentElement.parentElement.parentElement.dataset.id;
    likeBtn.addEventListener('click', async (e) => {
      likeDOM(e);
      like(tweetId);
    });
  });
};

export default displayTweets;
