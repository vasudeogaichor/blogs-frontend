const API_URL = process.env.REACT_APP_API_URL;

export const signupUser = async (signupDetails) => {
    console.log('signupDetails - ', signupDetails)
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signupDetails),
  });
  return await res.json();
};

export const loginUser = async (loginDetails) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  return await res.json();
};

export const validateUserToken = async (token) => {
  const response = await fetch(`${API_URL}/auth/validate-token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}
