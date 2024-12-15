export const UserRegistrationFormControls = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const UserLoginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const initialSignUpFormData = {
  username: "",
  email: "",
  password: "",
};

export const initialLoginFormData = {
  email: "",
  password: "",
};

export const BtnValid = (formData) => {
  return Object.keys(formData).every((key) => formData[key].trim() !== "");
};
