import { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import BlogListItem from "./BlogListItem"
import { listBlogs } from '../apis/blogs';
import Cookies from "js-cookie";

const BlogList = ({isAuthenticated, setIsAuthenticated, searchResults}) => {
  const [visible, setVisible] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState('');
  const [loginError, setLoginError] = useState(null)
  
  useEffect(() => {
    // Check for token in cookies
    const token = Cookies.get("token");

    if (token) {
      // Token is present, update isAuthenticated state
      setIsAuthenticated(true);
    } else {
      // Token is not present, redirect to login page
      setLoginError("Kindly login to see the posts")
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
    }
  }, []);

    const [allBlogs, setAllBlogs] = useState([]);

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
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
      let timer;
      if (visible) {
        timer = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
  
      return () => clearTimeout(timer);
    }, [visible]);
  
    useEffect(() => {
      setVisible(showDeleteAlert);
    }, [showDeleteAlert]);

    return (
      <>
        {loginError?.length > 0 && (
          <div className="alert alert-danger">{loginError}</div>
        )}
        {isAuthenticated && (
          <>
            <Alert
              show={visible}
              variant={alertVariant}
              onClose={() => {
                setVisible(false);
              }}
              dismissible
            >
              {deleteAlertMessage}
            </Alert>
            {allBlogs?.map((blog) => (
              <BlogListItem
                key={blog.id}
                isAuthenticated={isAuthenticated}
                id={blog.id}
                title={blog?.title}
                content={blog.content}
                createdAt={blog.created_at}
                setAllBlogs={setAllBlogs}
                setShowDeleteAlert={setShowDeleteAlert}
                setDeleteAlertMessage={setDeleteAlertMessage}
                setAlertVariant={setAlertVariant}
                visible={visible}
              />
            ))}
          </>
        )}
      </>
    );
}

export default BlogList