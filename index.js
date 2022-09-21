const express = require("express");
const cookieSession = require("cookie-session");
const passport = require('passport');
const keys = require("./config/keys");
require("./services/oauth");

const app = express();

// all the middlewares call
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// all the route calls
require("./routes/auth")(app);

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to port ${PORT}...`));
