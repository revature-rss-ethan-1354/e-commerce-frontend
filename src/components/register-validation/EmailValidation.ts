export let isValidEmail: (email: String) => String = function (
    email: String
  ): String {

    let lastAtPosition = email.lastIndexOf("@");
    let lastDotPosition = email.lastIndexOf(".");
    
    if(email.length === 0) {
        return "Email must not be empty";
    }

    if (
      !(
        lastAtPosition < lastDotPosition &&
        lastAtPosition > 0 &&
        email.indexOf("@@") == -1 &&
        lastDotPosition > 2 &&
        email.length - lastDotPosition > 2
      )
    ) {
      return "Invalid email format"
    } else {
    }

    return "";
  };