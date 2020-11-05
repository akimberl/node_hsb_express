/* Handling if this is the first time auction was saved and added */
if (document.auctionForm) {
  document.auctionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    /* getting all values */
    const error = document.querySelector('#loginErr');
    const inputItem = document.querySelector('#inputItem').value;
    const selectCond = document.querySelector('#selectCond').value;
    const inputStartAt = document.querySelector('#inputStartAt').value;
    const inputEndAt = document.querySelector('#inputEndAt').value;
    const description = document.querySelector('#description').value;
  
    /* handling input errors */
    if (!(inputItem && selectCond && inputStartAt && inputEndAt && description)) {
      error.innerText = 'fill the all inputs';
      return;
    }
    /* saving auction */
    const data = await fetch('/profile/auc', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputItem,
        condition: selectCond,
        startsAt: inputStartAt,
        endsAt: inputEndAt,
        description,
      }),
    });
    console.log(data);
    if (data.status === 200) {
      return window.location.assign('/profile'); // assign and href saves the histroy and let you go back to previous page
    }
    error.innerText = 'Oops, something went wrong! Auction not saved...';
  });
}

/* handling updating of auction (with PATCH method) */
if (document.auctionFormPatch) {
  document.auctionFormPatch.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    /* getting all values */
    const id = document.querySelector('#auctionId').value;
    console.log(id);
    const error = document.querySelector('#loginErr');
    const inputItem = document.querySelector('#inputItem').value;
    const selectCond = document.querySelector('#selectCond').value;
    const inputStartAt = document.querySelector('#inputStartAt').value;
    const inputEndAt = document.querySelector('#inputEndAt').value;
    const description = document.querySelector('#description').value;
  
    /* handling input errors */
    if (!(inputItem && selectCond && inputStartAt && inputEndAt && description)) {
      error.innerText = 'fill the all inputs';
      return;
    }
    /* saving auction */
    const data = await fetch(`/profile/auc/${id}/edit`, { // Как найти id на фронте о_О
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputItem,
        condition: selectCond,
        startsAt: inputStartAt,
        endsAt: inputEndAt,
        description,
      }),
    });
    if (data.status === 200) {
      return window.location.assign('/profile'); // assign and href saves the histroy and let you go back to previous page
    }
    error.innerText = 'Oops, something went wrong! Auction not saved...';
  });
}
