// delete this file after testing

const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value;
  const password = CreateUser.querySelector('.password').value;
  console.log("Username: ", username, " Password: ", password);
  post('/api/createUser', { username, password });
})
function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}