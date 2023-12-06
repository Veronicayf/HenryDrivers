
const validations = (form) => {
  const errors = {};
  if (form.name.trim().length === 0) {
    errors.name = "A name is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
    errors.name = "The name cannot contain special characters or numbers.";
  } else if (form.name.length > 20) {
    errors.name = "Cannot contain more than 20 characters";
  }

  if (form.lastName.trim().length === 0) {
    errors.lastName = "A last name is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.lastName)) {
    errors.lastName =
      "The last name cannot contain special characters or numbers";
  } else if (form.lastName.length > 20) {
    errors.lastName = "Cannot contain more than 20 characters";
  }

  if (form.nationality.trim().length === 0) {
    errors.nationality = "A nationality is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.nationality)) {
    errors.nationality =
      "Nationality cannot contain special characters or numbers";
  } else if (form.nationality.length > 20) {
    errors.nationality = "Cannot contain more than 20 characters";
  }
  if (form.image.trim().length === 0) {
    errors.image = "Image URL required";
  } else if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(form.image)) {
    errors.image = "The URL entered is not a valid image URL";
  }
  if (form.birthday === "") {
    errors.birthday = "A date of birth is required";
  } 
  if (form.teams.length === 0) {
    errors.teams = "At least one team is required";
  }

  return errors;
};
export default validations;
