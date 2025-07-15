export const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.session.user?.role === role) return next();
    res.status(403).send('Access denied');
  };
};
