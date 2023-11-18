const PostCreate = () => {
    return (
        <>
            <div className="container-fluid ">
                <h2 className="mb-4">Create a new post</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label h6">Title:</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter title" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content" className="form-label h6">Content:</label>
                        <textarea className="form-control" id="content" rows="8" placeholder="Enter content"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostCreate