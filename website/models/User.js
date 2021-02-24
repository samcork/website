
/** ##################################################################### - DATABASE*/

const users = {
  doctorwhocomposer: {
    username: "doctorwhocomposer",
    forename: "Delia",
    surname: "Derbyshire",
    email: "doctor@gmail.com",
    password: "steven"
  },
  tester: {
    username: "tester",
    forename: "Sean",
    surname: "McCorkindale",
    email: "test@gmail.com",
    password: "cheese"
  }
};

const usernames = ["doctorwhocomposer", "tester"];

/** ##################################################################### - DATABASE METHODS*/

module.exports = {
  // Create a user
  create({ username, forename, surname, email, password }) {
    return new Promise((resolve, reject) => {
      if (!users.hasOwnProperty(username)) {
        users[username] = { username, forename, surname, email, password };
        usernames.push(username);
        resolve(users[username]);
      } else {
        reject({ message: 'Username taken' });
      }
    });
  },

  // Find all users
  findAll() {
    return new Promise(resolve => {
      resolve(usernames.map(username => users[username]));
    });
  },

  // Find a user by username
  findByUsername(username) {
    return new Promise((resolve, reject) => {
      if (users.hasOwnProperty(username)) {
        resolve(users[username]);
      } else {
        reject("User does not exist.");
      }
    });
  },

  validateUser(username, password) {
    return new Promise((resolve, reject) => {
      if (users.hasOwnProperty(username)) { // Check user exists.
        if (users[username].password === password) { // Check passwords match.
          resolve("You have logged in!")
        } else {
          reject("Incorrect password!")
        }
      } else {
        reject("User does not exist!")
      }
    })
  },

  // Delete an existing user
  deleteUser(user) {
    return new Promise((resolve, reject) => {
      if (users.hasOwnProperty(user.username)) {
        delete users[user.username];
        usernames.splice(usernames.indexOf(this.user.username), 1);
        resolve("User deleted!");
      } else {
        reject("User does not exist.");
      }
    });
  }
};

/** #####################################################################*/