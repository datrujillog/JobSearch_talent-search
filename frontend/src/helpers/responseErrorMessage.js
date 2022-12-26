export const createErrorMessage = (error) => {

  let itemError;
  if (error.response.data.message.errors) {
    error.response.data.message.errors.forEach(({ msg }) => {
      itemError += `<p>${msg}.</p>`;
    });
    return `<div ">${itemError}.</div>`;
  }
  return `<div ><p>${error.response.data.message}</p></div>`;
};
