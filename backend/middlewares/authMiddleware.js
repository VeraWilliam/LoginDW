const authMiddleware = async (req, res, next) => {
const token = req.cookies.token;
if (!token) return res.status(401).json({ message: 'No autenticado' });

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id);


if (!user || user.token !== token) {
  return res.status(401).json({ message: 'Token inválido' });
}

req.user = user;
next();
} catch (err) {
res.status(401).json({ message: 'Token inválido' });
}
};

