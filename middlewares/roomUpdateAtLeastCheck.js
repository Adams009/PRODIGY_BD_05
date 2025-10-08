const atLeastOneRoomField = (req, res, next) => {
  const updatableFields = [
    "roomNumber",
    "roomType",
    "capacity",
    "price",
    "description",
    "amenities"
  ];

  const hasField = updatableFields.some(field => req.body[field] !== undefined);

  if (!hasField) {
    return res.status(400).json({ error: "At least one field must be provided for update" });
  }

  next();
};

export default atLeastOneRoomField;
