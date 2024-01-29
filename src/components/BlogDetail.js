import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog } from '../apis/blogs';
import { formatDateTime } from "../utils"

const BlogDetail = () => {
    const { blogId } = useParams();
    const [currentBlog, setCurrentBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blog = await getBlog(blogId);
                setCurrentBlog(blog.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (!currentBlog) {
        return null;
    }

    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <h1 className="mb-0">{currentBlog.title}</h1>
                <h6 className='fw-light'>by @{currentBlog.user.username}</h6>
                <div className="mb-1 text-muted">{formatDateTime(currentBlog.created_at)}</div>
                <p className="card-text mb-auto">{currentBlog.content}</p>
            </div>
        </div>
    )
}

export default BlogDetail