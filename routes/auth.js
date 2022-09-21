const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/auth/currentuser", (req, res) => {
    // console.log(req.session);
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  })
  
};
