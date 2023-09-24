async function deleteFormHandler(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')
  [window.location.toString().split('/').length -1 ];

  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
  });

  if (response.ok) {
      document.location.replace(`/posts/${id}`);
  } else {
      alert('Failed to update post');
  }
}

document
.querySelector('.delete-button')
.addEventListener('click', delButtonHandler);