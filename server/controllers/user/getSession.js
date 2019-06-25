const getSession = function (req, res) {
   if (req.session.user) {
      res.status(200).json(req.session.user);
   } else {
      res.sendStatus(204);
   };
};

module.exports = getSession;