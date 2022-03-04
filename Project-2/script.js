// Get Request
function getUser() {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      const users = res.data;
      document.getElementById("res").innerHTML = "";
      users.forEach((user) => showOutput(user));
    })
    .catch((err) => console.error(err));
}

// Show output in browser
function showOutput(user) {
  document.getElementById("res").innerHTML += `
    <div class="result mt-20">
     <span onclick="sceSelect(${user.id})"><p>${user.name}</p></span>
    </div>
`;
}

// Show selected user info
async function sceSelect(userId) {
  let uri = `https://jsonplaceholder.typicode.com/users/${userId}`;
  let resultForUser;
  await axios.get(uri).then((res) => {
    resultForUser = res.data;
    console.log(res);
  });

  document.getElementById("res").innerHTML = "";
  document.getElementById("res").innerHTML = `
    <div class="col">
    <p>${resultForUser.username}</p><br>
    <p>${resultForUser.website}</p><br>
    <p>${resultForUser.phone}</p><br>
    </div>
    `;
}

// Show search result
function showResult() {
  let input = document.getElementById("userInput").value;
  axios
    .get("https://jsonplaceholder.typicode.com/users", {
      params: { username: input },
    })
    .then((res) => {
      document.getElementById("showSearch").innerHTML = "";
      document.getElementById("showSearch").innerHTML = `
    <div class="col">
    <p>${res.data[0].name}</p><br>
    <p>${res.data[0].company.name}</p><br>
    <p>${res.data[0].email}</p><br>
    </div>
    `;
      console.log(res);
    })
    .catch((err) => console.error(err));
}

// Event listeners
document.getElementById("get").addEventListener("click", getUser);
