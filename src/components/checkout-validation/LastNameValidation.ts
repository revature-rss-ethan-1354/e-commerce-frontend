export let isValidLastName: (lastName: String) => String = function (
    lastName: String
 ): String {

    if(lastName.length === 0) {
        return "Last name must not be empty";
    }

   return "";
 };