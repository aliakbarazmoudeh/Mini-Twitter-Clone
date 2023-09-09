const nameDOM = document.querySelector('.profile h1'),
  usernameDOM = document.querySelector('.profile span'),
  bioDOM = document.querySelector('.profile p'),
  numOfTweets = document.querySelector('.tweets-count'),
  Container = document.querySelector('.tweets'),
  followingDOM = document.querySelector('.followings-count'),
  followerDOM = document.querySelector('.followers-count'),
  bookMarkDOM = document.querySelector('.book-mark-count'),
  navBtnDOM = document.querySelectorAll('.container ul li'),
  ContainerTitle = document.querySelector('nav a');

let userInfo, Followers;

const followingsTemplate = (data, status) => {
  Container.innerHTML = data
    .map((obj) => {
      let user = obj[status];
      return `<li>
  <div class="info">
  <strong>${user.name}<span> @${user.username}</span></strong>
  </div>
  <div class="btn">
    <button>${status == 'followings' ? 'Unfollow' : 'Remove'}</button>
  </div>
  </li>`;
    })
    .join('');
};

const bookMarksTemplate = (bookMarks) => {
  Container.innerHTML = bookMarks
    .map(({ Tweet: tweet, Tweet: { User: user } }) => {
      return `<li>
  <div class="info">
  <strong>${user.name}<span>@${user.username}</span></strong>
  <p>${tweet.text}</p>
  <div class="actions">
  <a href=""><img src="./src/images/like.svg" alt="Like">${tweet.numOfLikes}</a>
  </div>
  </div>
  </li>`;
    })
    .join('');
};

const tweetsTemplate = (user) => {
  const { Tweets } = user;
  Container.innerHTML = Tweets.map((tweet) => {
    return `<li>
  <div class="info">
  <strong>${user.name}<span>@${user.username}</span></strong>
  <p>${tweet.text}</p>
  <div class="actions">
  <a href=""><img src="./src/images/like.svg" alt="Like">${tweet.numOfLikes}</a>
  </div>
  </div>
  </li>`;
  }).join(' ');
};

const activateNavBtns = async () => {
  navBtnDOM.forEach((btn) => {
    btn.addEventListener('click', () => {
      navBtnDOM.forEach((btn) => {
        btn.classList.remove('active');
      });
      btn.classList.add('active');
      const btnId = btn.dataset.id;
      ContainerTitle.textContent = btnId;
      if (btn.dataset.id === 'Followers') {
        followingsTemplate(Followers, 'Followers');
      }
      if (btnId === 'Followings') {
        followingsTemplate(userInfo[btnId], 'followings');
      }
      if (btnId === 'Tweets') {
        tweetsTemplate(userInfo);
      }
      if (btnId === 'BookMarks') {
        bookMarksTemplate(userInfo[btnId]);
      }
    });
  });
};

const fetchCurrentUser = async () => {
  const response = await fetch(`/api/v1/users`);
  const { user: currentUser, Followers: followers } = await response.json();
  const { Tweets, Followings, BookMarks } = currentUser;
  userInfo = currentUser;
  Followers = followers;
  numOfTweets.textContent = Tweets.length;
  nameDOM.textContent = currentUser.name;
  usernameDOM.textContent = currentUser.username;
  currentUser.bio
    ? (bioDOM.textContent = currentUser.bio)
    : (bioDOM.textContent = 'Bio');
  Followings
    ? (followingDOM.textContent = Followings.length)
    : (followingDOM.textContent = '0');
  followers
    ? (followerDOM.textContent = followers.length)
    : (followerDOM.textContent = '0');
  BookMarks
    ? (bookMarkDOM.textContent = BookMarks.length)
    : (bookMarkDOM.textContent = '0');
  tweetsTemplate(currentUser);
};
window.addEventListener('load', async () => {
  await fetchCurrentUser();
  activateNavBtns();
});
