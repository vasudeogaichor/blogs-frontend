const API_URL = process.env.REACT_APP_API_URL;
console.log('process.env - ', process.env)
console.log('API_URL - ', API_URL)

// Create a new blog
export const createBlog = async (blog) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  return data.message;
};

// Get single blog
export const getBlog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  const blog = await res.json();
  return blog.message;
};

// List a number of blogs
export const listBlogs = async (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const res = await fetch(`${API_URL}?${queryString}`);
  const blogs = await res.json();
  return blogs;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const status = res.status;
  return status
};
