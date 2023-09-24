import showUserPage from './showUserPage.js';

const asideInput = document.querySelector('.aside_input input'),
  asideContainer = document.querySelector('.aside_container');

const searchUser = async () => {
  if (asideInput.value === '') {
    asideContainer.innerHTML = '';
    return;
  }
  let allUsers = await fetch(`/api/v1/users/search/${asideInput.value}`);
  allUsers = await allUsers.json();
  asideContainer.innerHTML = '';
  asideContainer.innerHTML = allUsers
    .map(({ id, username, name, profile, official }) => {
      return `
      <div class="profile-wrap" data-id="${id}">
        <div class="profile-header">
          <img src=${
            profile ? profile : './src/profiles/default_profile.png'
          } alt="" class="avator" data-id="${id};${null}">
          <div class="profile-header-info">

            ${name}
            ${
              official
                ? "<img class='blue-check' src='./src/images/Check Mark Badge.png' alt=''></img>"
                : ''
            }
            <span>@${username}</span>
            
            </div>

            </div>
        </div>
      </div>

    `;
    })
    .join(' ');
  const avators = asideContainer.querySelectorAll('.avator');
  avators.forEach((avator) => {
    avator.addEventListener('click', (e) => {
      asideInput.value = '';
      showUserPage(e);
    });
  });
};

export default searchUser;
