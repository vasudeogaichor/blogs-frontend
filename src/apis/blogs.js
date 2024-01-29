import Cookies from "js-cookie";
const API_URL = `${process.env.REACT_APP_API_URL}/posts`;

const getAuthToken = () => {
  return Cookies.get("token");
};

// Create a new blog
export const createBlog = async (blog) => {
  const token = getAuthToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  return data.message;
};

// Get single blog
export const getBlog = async (id) => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blog = await res.json();
  return blog.data;
};

// List a number of blogs
export const listBlogs = async (queryParams) => {
  const token = getAuthToken();
  const queryString = new URLSearchParams(queryParams).toString();
  const res = await fetch(`${API_URL}?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blogs = await res.json();
  return blogs;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const status = res.status;
  return status;
};

// Edit a blog
export const editBlog = async (id, editedBlog) => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editedBlog),
  });
  const data = await res.json();
  return data;
};

// Like a blog
export const handleBlogLike = async (id, likeInfo) => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/${id}/likes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(likeInfo),
  });
  const result = await res.json();
  return result;
}

// Add or remove a comment blog
export const handleBlogComment = async (id, commentInfo) => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentInfo),
  });
  const result = await res.json();
  return result;
}