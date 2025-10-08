
/**
 * Build an update object dynamically by checking only allowed fields
 * @param {object} source - request body (req.body)
 * @param {string[]} allowedFields - list of fields that can be updated
 * @returns {object} updateData
 */
export const buildUpdateData = (source, allowedFields) => {
  const updateData = {};
  allowedFields.forEach((field) => {
    if (source[field] !== undefined) {
      updateData[field] = source[field];
    }
  });
  return updateData;
};
