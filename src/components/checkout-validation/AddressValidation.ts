export let isValidAddress: (address: String) => String = function (
    address: String
 ): String {

    if(address.length === 0) {
        return "Address must not be empty";
    }

   return "";
 };