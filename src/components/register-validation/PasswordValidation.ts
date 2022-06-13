export let isValidPassword: (password: String) => String = function (
    password: String
  ): String {  

    if(password.length === 0) {
        return "Password must not be empty";
    }

    if (password.length < 8){

      return "Password must be at least 8 characters";
    } else {
    }

    return "";
  };