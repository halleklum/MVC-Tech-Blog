async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('textarea[name="post-description"]').value;

    // window.location gives us access to the URL We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const id = window.location.toString().split('/')
    [window.location.toString().split('/').length -1 ];

    // the controller will handle this put request
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // confirmation the post was updated successfully
    if (response.ok) {
        document.location.replace(`/myposts}`);
    } else {
        alert('Failed to update post');
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);