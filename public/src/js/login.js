const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const submitBtn = document.querySelector('.submit-btn');
const massageBox = document.querySelector('.massage-box');

submitBtn.addEventListener('click', async () => {
  console.log('hello world');
  massageBox.textContent = '';
  const userInfo = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const response = await fetch('/api/v1/users/login', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status >= 400) {
    const err = await response.json();
    massageBox.textContent = err.msg;
    return;
  }
  const userPayload = await response.json();
  window.location.replace('/twitter.html');
});
