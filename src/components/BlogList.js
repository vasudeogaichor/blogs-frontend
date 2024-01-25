import { useState, useEffect } from "react";
import BlogListItem from "./BlogListItem";
import { listBlogs } from "../apis/blogs";
import { useAuth } from "../AuthContext";

const BlogList = ({ searchResults }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    if (searchResults.length > 0) {
      setAllBlogs(searchResults);
    }
  }, [searchResults]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await listBlogs();
        setAllBlogs(blogs.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {allBlogs?.map((blog) => (
        <BlogListItem
          key={blog.id}
          blog={blog}
          setAllBlogs={setAllBlogs}
          loggedInUser={loggedInUser}
        />
      ))}
    </>
  );
};

export default BlogList;
