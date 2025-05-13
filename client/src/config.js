const getApiUrl = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'production':
      return 'https://ccc-api.tripodmobile.com:5000/api';
    case 'staging':
      return 'https://staging-api.yourcourseplatform.com/api';
    default:
      return 'https://localhost:5000/api';
  }
};

export const API_URL = getApiUrl();

export const endpoints = {
  signin: `${API_URL}/auth/signin`,
  signup: `${API_URL}/auth/signup`,
  courses: `${API_URL}/courses`,
  courseDetail: (id) => `${API_URL}/courses/${id}`,
}; 