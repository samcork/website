
// API

/** ##################################################################### - SETTINGS*/

// Setup
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const upload = multer();
const app = express();

// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jwt-simple");
const SECRET = "mysecret";

// Models
const User = require("./models/User");
const Story = require("./models/Story");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.array());

/** ##################################################################### - JWT AUTHENTICATION*/

passport.use(
  new LocalStrategy((username, password, done) => {
    User.validateUser(username, password)
      .then(res => {
        done(null, jwt.encode({ username }, SECRET));
        return;
      })
      .catch(err => {
        done(null, false);
      });
  })
);

passport.use(
  new BearerStrategy((token, done) => {
    const { username } = jwt.decode(token, SECRET);
    User.findByUsername(req.params.username)
      .then(res => {
        {
          done(null, username);
          return;
        }
      })
      .catch(err => {
        done(null, false);
      });
  })
);

// Verify Token

// /** ##################################################################### - HTTP REQUESTS*/

// Login
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.send({
      token: req.user
    });
  }
);

// Find all users
app.get("/people", (_, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.send(error);
    });
});

// Find a specific user
app.get("/people/:username", (req, res) => {
  var username = req.params.username
  if (req.params.username.length > 50) {
    username = jwt.decode(username, SECRET).username;
  }
  User.findByUsername(username)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

// Create a new user
app.post("/people", (req, res) => {
  if (!req.body.access_token || req.body.access_token !== "concertina") {
    res.sendStatus(403);
  } else if (req.body.password !== req.body.password2) {
    res.status(400).send("Passwords do not match!");
  } else {
    User.create({
      username: req.body.username,
      forename: req.body.forename,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.send("Successfully registered!");
      })
      .catch(error => {
        res.status(400).send(error.message);
      });
  }
});

// Delete an existing user
app.delete("/people/:username", (req, res) => {
  User.findByUsername(req.params.username)
    .then(user => {
      User.deleteUser(user)
      .then(verify => {
        res.send(verify);
      })
      .catch(error => {
        res.send(error)
      })
    })
    .catch(error => {
      res.send(error);
    });
});

// Find stories with search criteria
app.post("/search", (req, res) => {
  var search = req.body.search
  if (search.length > 50) {
    search = jwt.decode(search, SECRET).username;
  }
  Story.findStories(search)
    .then(story => {
      res.send(story);
    })
    .catch(error => {
      res.send(error);
    });
});

// Find all stories
app.get("/stories", (req, res) => {
  Story.findAllStories()
    .then(stories => {
      res.send(stories);
    })
    .catch(error => {
      res.send(error);
    });
});

app.post("/write", (req, res) => {
  const { username } = jwt.decode(req.body.storyAuthor, SECRET);
  Story.createStory({
    title: req.body.storyTitle,
    text: req.body.storyText,
    author: username
  })
    .then(story => {
      res.send(story);
    })
    .catch(error => {
      res.send(error);
    });
});

app.delete("/profile/:story", (req, res) => {
  Story.deleteStory(req.params.story)
    .then(author => {
      Story.findStories(author)
      .then(stories => {
        res.send(stories)
      })
      .catch(err =>{
        console.log(err)
      })
    })
    .catch(err => {
      res.status(400).send(err)
    })
});

// /** ##################################################################### - STARTUP*/

//Static file declaration
app.use(express.static(path.join(__dirname, '/client/build')));

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

module.exports = app
