import {
  tweetsTemplate,
  activateNavBtns,
  bookMarksTemplate,
  followingsTemplate,
} from './templates/profile.js';
import follow from './utils/follow.js';

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
  actionBtn = document.querySelector('.actions button'),
  profilePic = document.querySelector('.avatar');

actionBtn.addEventListener('click', (e) => {
  e.preventDefault();
  follow(UserId, actionBtn);
});

const fetchUser = async () => {
  const response = await fetch(`/api/v1/users/${UserId}`);
  let isFollowedResponse = await fetch(`/api/v1/users/follow/${UserId}`);
  const { user: currentUser, Followers: followers } = await response.json();
  const { Tweets, Followings, BookMarks } = currentUser;
  const { isFollowed } = await isFollowedResponse.json();
  userInfo = currentUser;
  Followers = followers;
  numOfTweets.textContent = Tweets.length;
  nameDOM.textContent = currentUser.name;
  profilePic.src = currentUser.profile
    ? currentUser.profile
    : './src/profiles/default_profile.png';
  actionBtn.textContent = isFollowed ? 'Unfollow' : 'Follow';
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
