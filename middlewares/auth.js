const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token){
    return res.status(401).json({message: "Token not provided"});
  }

  try{
    const decode = verifyToken(token);
    User.findOne({
      where: {
        id: decode.id,
        email: decode.email,
      }
    })
      .then((user) => {
        if (!user){
          throw {
            code: 401,
            name: "Authentication Error",
            message: `User with id ${decode.id} not found in database`,
          }
        }
        res.locals.user = user.dataValues;
        next();
      })
      .catch((e) => {
        return res.status(e.code || 500).json(err);
      })
  } catch (e) {
    res.status(401).json(e);
  }
};

module.exports = {
  authentication
};