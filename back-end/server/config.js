module.exports = {
  session: {
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
  },
  serializeUser: (user, done) => {
    done(null, user._id);
  },
  deeserializeUser: (_id, done) => {
    User.findById(_id).then(user => {
      done(null, user);
    });
  }
};
