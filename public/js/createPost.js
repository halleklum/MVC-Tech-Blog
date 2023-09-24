async function createPostsHandler() {
  console.log("save post")
  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value.trim();
   console.log(title, description)
   
  if (title && description) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
   

   document.location.replace('/myposts')
}
