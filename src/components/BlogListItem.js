const moment = require('moment');

const BlogListItem = ({id, title, content, createdAt}) => {
    const date = moment(createdAt);
    const formattedDate = date.format('MMMM DD, YYYY, h:mm:ss A');
    const trimmedContent = content.slice(0, 500)
    
    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{title}</h3>
                <div className="mb-1 text-muted">{formattedDate}</div>
                <p className="card-text mb-auto">{trimmedContent}</p>
                <a href={`/${id}`}>Continue reading</a>
            </div>
        </div>
    )
}

export default BlogListItem