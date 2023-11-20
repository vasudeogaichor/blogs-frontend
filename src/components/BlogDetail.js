import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog } from '../apis/blogs';

const BlogDetail = () => {
    const { blogId } = useParams();
    const [currentBlog, setCurrentBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blog = await getBlog(blogId);
                setCurrentBlog(blog);
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
                <h3 className="mb-0">{currentBlog.title}</h3>
                <div className="mb-1 text-muted">{currentBlog.created_at}</div>
                <p className="card-text mb-auto">{currentBlog.content}</p>
            </div>
        </div>
    )
}

export default BlogDetail