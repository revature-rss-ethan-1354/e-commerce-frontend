export let isValidEmail: (email: String) => boolean = function (
  email: String
): boolean {
  let lastAtPosition = email.lastIndexOf("@");
  let lastDotPosition = email.lastIndexOf(".");

  if (
    !(
      lastAtPosition < lastDotPosition &&
      lastAtPosition > 0 &&
      email.indexOf("@@") == -1 &&
      lastDotPosition > 2 &&
      email.length - lastDotPosition > 2
    )
  ) {
    console.log("Sorry not an email");
    return false;
  } else {
    return true;
  }
};
