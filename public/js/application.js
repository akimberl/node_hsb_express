/* login */
if (document.loginForm) {
  document.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const container = document.querySelector('.registration');
    const error = document.querySelector('#loginErr');
    const email = document.loginForm.email.value;
    const password = document.loginForm.password.value;
    const data = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.status === 200) {
      return window.location.assign('/'); // assign and href saves the histroy and let you go back to previous page
    }
    container.classList.add('errorBorder');
    error.innerText = 'Wrong email or password';
  });
}

/* registration */
if (document.registrationForm) {
  document.registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = document.registrationForm;
    const error = document.querySelector('#registrationErr');
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const password2 = form.password2.value;

    /* checking if inputs filled right */
    if (!(email && name && password === password2)) {
      form.classList.add('errorBorder');
      error.innerText = 'Пожалуйста, заполните все поля правильно!';
      return;
    }

    const data = await fetch('/registration', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    });
    /* handling success case */
    if (data.status === 200) {
      return document.location.assign('/login');
    }
    error.innerText = 'Email уже используется другим пользователем';
    form.classList.add('errorBorder');
  });
}
