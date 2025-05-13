const API_KEY = process.env.API_KEY;

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid API key'
    });
  }

  next();
};

module.exports = validateApiKey; 