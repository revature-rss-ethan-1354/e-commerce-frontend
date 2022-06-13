export let isValidFullName: (fullName: String) => String = function (
    fullName: String
 ): String {

    if(fullName.length === 0) {
        return "Full name must not be empty";
    } 
   return "";
 };