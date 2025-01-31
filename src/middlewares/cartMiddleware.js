const validateCart = (req, res, next) => {
  const { userId, product } = req.body;
  console.log(req.body);
  

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  next();
};

export { validateCart };
