module.exports = (req, res, next) => {
  // Do the things related to auth
  console.log("The auth process has been succeed!");
  next();
};
