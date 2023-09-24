import { tweetsTemplate, activateNavBtns } from './templates/profile.js';
const nameDOM = document.querySelector('.profile h1'),
  usernameDOM = document.querySelector('.profile span'),
  bioDOM = document.querySelector('.profile p'),
  numOfTweets = document.querySelector('.tweets-count'),
  followingDOM = document.querySelector('.followings-count'),
  followerDOM = document.querySelector('.followers-count'),
  bookMarkDOM = document.querySelector('.book-mark-count'),
  profilePic = document.querySelector('.avatar');

const fetchCurrentUser = async () => {
  const response = await fetch(`/api/v1/users`);
  const { user: currentUser, Followers: followers } = await response.json();
  const { Tweets, Followings, BookMarks } = currentUser;
  numOfTweets.textContent = Tweets.length;
  nameDOM.textContent = currentUser.name;
  profilePic.src = currentUser.profile;
  usernameDOM.textContent = currentUser.username;
  currentUser.biography
    ? (bioDOM.textContent = currentUser.biography)
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
  activateNavBtns(currentUser, followers);
};
window.addEventListener('load', async () => {
  await fetchCurrentUser();
});
