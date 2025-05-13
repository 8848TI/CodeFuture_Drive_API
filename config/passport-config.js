const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const db = require('../db/index') // 假设你用这个来处理数据库

module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: 'Ov23lii8WSD8QRIGulWH',
    clientSecret: '1af57af158c699afb55790e6c918be30b26acf97',
    callbackURL: "http://127.0.0.1:3007/api/8848TI/github/login"
  },
  function(accessToken, refreshToken, profile, done) {
    // 这里可以处理用户信息，例如保存到数据库
    // 示例：检查用户是否存在，不存在则创建
    const sql = 'SELECT * FROM users WHERE github_id = ?';
    db.query(sql, [profile.id], (err, results) => {
      if (err) return done(err);
      if (results.length === 0) {
        const insertSql = 'INSERT INTO users (username, github_id) VALUES (?, ?)';
        db.query(insertSql, [profile.username, profile.id], (insertErr, insertResult) => {
          if (insertErr) return done(insertErr)
          profile.id = insertResult.insertId
          return done(null, profile)
        });
      } else {
        return done(null, results[0])
      }
    });
  }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    const sql = 'SELECT * FROM users WHERE id = ?'
    db.query(sql, [id], (err, results) => {
      if (err) return done(err)
      done(null, results[0])
    });
  });
};