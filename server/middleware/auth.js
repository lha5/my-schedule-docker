const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (token) {
    token = token.split(' ')[1];

    User.findByToken(token, function (err, user) {
      if (err) {
        throw err;
      }
  
      if (!user) {
        return res.json({ isAuth: false, error: true });
      }
  
      req.token = token;
      req.user = user;
      
      next();
    });
  } else {
    console.log('받은 토큰이 없음');
    
    return res.json({ isAuth: false, error: true });
  }
};

module.exports = { auth };
