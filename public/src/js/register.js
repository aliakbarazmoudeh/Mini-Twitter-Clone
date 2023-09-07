const usernameInput = document.querySelector('.username-input');
const nameInput = document.querySelector('.name-input');
const passwordInput = document.querySelector('.password-input');
const emailInput = document.querySelector('.email-input');
const submitBtn = document.querySelector('.submit-btn');
const massageBox = document.querySelector('.massage-box');

submitBtn.addEventListener('click', async () => {
  massageBox.textContent = '';
  const userInfo = {
    name: nameInput.value,
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  const response = await fetch('/api/v1/users/register', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 500) {
    massageBox.textContent = 'invalid values';
    return;
  }
  if (response.status >= 400) {
    const err = await response.json();
    massageBox.textContent = err.msg;
    return;
  }
  const userPayload = await response.json();
  console.log(userPayload);

  // window.location.replace('/twitter.html');
});
