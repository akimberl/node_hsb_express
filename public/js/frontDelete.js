/* deleting auction (with DELETE method) */
console.log('Hello');
document.addEventListener('click', async (event) => {
  event.preventDefault()
  /* getting all values */
  const id = event.path[0].id // id of auction
  const tag = event.path[0] // tag containing
  const maintag = event.path[1];
  if (tag.classList.contains('delete')) {
    const error = event.path[1].querySelector('#error');

    /* deleting auction */
    const data = await fetch(`/profile/auc/${id}/delete`, { // Как найти id на фронте о_О
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (data.status === 200) {
      return maintag.remove()
    }
    error.innerText = 'Oops, something went wrong! Auction cannot be deleted...';
  }
});
