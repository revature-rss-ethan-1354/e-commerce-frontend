export let isValidCountry: (country: String) => String = function (
    country: String
 ): String {

    if(country.length === 0) {
        return "Country must not be empty";
    } 

   return "";
 };