import Swal from "sweetalert2";

const successMessage = (message) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2500,
    background: "#212529",
  });
};

const errormesage = (html) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    background: "#212529",
    html: html,
  
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  })
};

export { successMessage, errormesage };
