// user.js
const users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password123"
  }
];

exports.getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

exports.getUserById = (id) => {
  return users.find((user) => user.id === id);
};

exports.createUser = (name, email, password) => {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };
  users.push(newUser);
  return newUser;
};
