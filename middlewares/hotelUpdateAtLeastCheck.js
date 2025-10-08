const atLeastOneHotelField = (req, res, next) => {
  const updatableFields = ["name", "address", "city", "state", "country"];
  const hasField = updatableFields.some(field => req.body[field] !== undefined);

  if (!hasField) {
    return res.status(400).json({ error: "At least one field must be provided for update" });
  }
  next();
};

export default atLeastOneHotelField;