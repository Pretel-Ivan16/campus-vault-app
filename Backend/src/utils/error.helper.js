const HTTP_STATUS = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const ERROR_MESSAGES = {
  EMAIL_EXISTS: "Email already exists",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_CREATED_SUCCESS: "User created successfully"
};

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

const sendSuccess = (res, statusCode, message, data = null) => {
  const response = { message };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

module.exports = {
  HTTP_STATUS,
  ERROR_MESSAGES,
  sendError,
  sendSuccess
};
