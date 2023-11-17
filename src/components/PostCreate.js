const PostCreate = () => {
    return (
        <>
            <div class="container mt-5">
                <h2 class="mb-4">Create a new post</h2>

                <form>
                    <div class="mb-3">
                        <label for="title" class="form-label h6">Title:</label>
                        <input type="text" class="form-control" id="title" placeholder="Enter title" />
                    </div>

                    <div class="mb-3">
                        <label for="content" class="form-label h6">Content:</label>
                        <textarea class="form-control" id="content" rows="8" placeholder="Enter content"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostCreate