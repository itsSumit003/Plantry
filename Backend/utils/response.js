export const sendResponse = (
  res,
  status_code = 200,
  success = true,
  message = "",
  data = null,
  error = null
) => {
  return res.status(status_code).json({
    status_code,
    success,
    message,
    data,
    error,
  });
};
