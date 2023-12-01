import { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import BlogListItem from "./BlogListItem"
import { listBlogs } from '../apis/blogs';

const BlogList = ({isAuthenticated, searchResults}) => {
  const [visible, setVisible] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState('');
  
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
        <Alert
        show={visible}
        variant={alertVariant}
        onClose={() => {
          setVisible(false)
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
    );
}

export default BlogList