import {
  tweetsTemplate,
  activateNavBtns,
  bookMarksTemplate,
  followingsTemplate,
} from './templates/profile.js';

let params = new URLSearchParams(decodeURIComponent(window.location.search));
let UserId = params.get('user');
let userInfo, Followers;

const nameDOM = document.querySelector('.profile h1'),
  usernameDOM = document.querySelector('.profile span'),
  bioDOM = document.querySelector('.profile p'),
  numOfTweets = document.querySelector('.tweets-count'),
  Container = document.querySelector('.tweets'),
  followingDOM = document.querySelector('.followings-count'),
  followerDOM = document.querySelector('.followers-count'),
  bookMarkDOM = document.querySelector('.book-mark-count'),
  navBtnDOM = document.querySelectorAll('.container ul li'),
  ContainerTitle = document.querySelector('nav a'),
  profilePic = document.querySelector('.avatar');

const fetchUser = async () => {
  const response = await fetch(`/api/v1/users/${UserId}`);
  const { user: currentUser, Followers: followers } = await response.json();
  const { Tweets, Followings, BookMarks } = currentUser;
  userInfo = currentUser;
  Followers = followers;
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
  tweetsTemplate(currentUser);
  activateNavBtns(currentUser, followers);
};

window.addEventListener('load', async () => {
  await fetchUser();
});
