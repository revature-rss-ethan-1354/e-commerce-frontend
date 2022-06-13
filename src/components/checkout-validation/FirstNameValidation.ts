export let isValidFirstName: (firstName: String) => String = function (
    firstName: String
 ): String {
    firstName = firstName.toLocaleLowerCase();
    if(firstName.length === 0) {
        return "First name must not be empty";
    }

   return "";
 };