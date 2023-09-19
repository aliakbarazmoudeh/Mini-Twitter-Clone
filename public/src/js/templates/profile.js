const Container = document.querySelector('.tweets'),
  navBtnDOM = document.querySelectorAll('.container ul li'),
  ContainerTitle = document.querySelector('nav a');

export const followingsTemplate = (data, status) => {
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

export const bookMarksTemplate = (bookMarks) => {
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

export const tweetsTemplate = (user) => {
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

export const activateNavBtns = async (userInfo, Followers) => {
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

export default {
  tweetsTemplate,
  bookMarksTemplate,
  activateNavBtns,
  followingsTemplate,
};
