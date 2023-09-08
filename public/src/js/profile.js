const nameDOM = document.querySelector('.profile h1'),
  usernameDOM = document.querySelector('.profile span'),
  bioDOM = document.querySelector('.profile p'),
  numOfTweets = document.querySelector('.tweets-count'),
  tweetsContainer = document.querySelector('.tweets'),
  followingDOM = document.querySelector('.followings-count'),
  followerDOM = document.querySelector('.followers-count'),
  bookMarkDOM = document.querySelector('.book-mark-count');

const fetchCurrentUser = async () => {
  const response = await fetch(`/api/v1/users`);
  const { user: currentUser, Followers } = await response.json();
  const { Tweets, Followings, BookMarks } = currentUser;
  console.log(currentUser);
  numOfTweets.textContent = Tweets.length;
  nameDOM.textContent = currentUser.name;
  usernameDOM.textContent = currentUser.username;
  currentUser.bio
    ? (bioDOM.textContent = currentUser.bio)
    : (bioDOM.textContent = 'Bio');
  Followings
    ? (followingDOM.textContent = Followings.length)
    : (followingDOM.textContent = '0');
  Followers
    ? (followerDOM.textContent = Followers.length)
    : (followerDOM.textContent = '0');
  BookMarks
    ? (bookMarkDOM.textContent = BookMarks.length)
    : (bookMarkDOM.textContent = '0');
  tweetsContainer.innerHTML = Tweets.map((tweet) => {
    return `<li>
  <div class="info">
  <strong>${currentUser.name}<span>@${currentUser.username}</span></strong>
  <p>${tweet.text}</p>
  <div class="actions">
  <a href=""><img src="./src/images/like.svg" alt="Like">${tweet.numOfLikes}</a>
  </div>
  </div>
  </li>`;
  }).join(' ');
};
window.addEventListener('load', fetchCurrentUser());
