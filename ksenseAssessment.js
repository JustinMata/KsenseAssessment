const tbody = document.getElementById("body");
const currentPosts = document.getElementById("posts");

const getUsers = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  return users;
};

const createCard = (post) => {
  const card = document.createElement("div");
  card.className = "card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = post.title;
  cardBody.appendChild(cardTitle);

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = post.body;
  cardBody.appendChild(cardText);

  return card;
};

const getPosts = async (id) => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );
  const posts = await data.json();
  const cards = await posts.map((post) => createCard(post));

  while (currentPosts.childElementCount !== 1) {
    currentPosts.removeChild(currentPosts.lastChild);
  }

  cards.forEach((card) => {
    currentPosts.appendChild(card);
  });
};

const createRow = (user) => {
  const tr = document.createElement("tr");
  tr.onclick = () => getPosts(user.id);
  tr.style.cursor = "pointer";

  const id = document.createElement("th");
  id.innerText = user.id;
  id.setAttribute("scope", "row");
  tr.appendChild(id);

  const name = document.createElement("td");
  name.innerText = user.name;
  tr.appendChild(name);

  const email = document.createElement("td");
  email.innerText = user.email;
  tr.appendChild(email);

  const phone = document.createElement("td");
  phone.innerText = user.phone;
  tr.appendChild(phone);

  return tr;
};

const appendRows = async () => {
  const users = await getUsers();
  const rows = users.map((user) => createRow(user));
  rows.forEach((row) => {
    tbody.appendChild(row);
  });
};

appendRows();
