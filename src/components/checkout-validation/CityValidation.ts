export let isValidCity: (city: String, country: String) => String = function (
    city: String, country: String
 ): String {

    if(city.length === 0) {
        return "City must not be empty";
    } 
    
    if(country.toLowerCase() === "canada") {
        const pattern = "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$";
        
        if (city.match(pattern)){
        } else {
            return "Invalid City";
        }

    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "united states of america" || country.toLowerCase() === "U.S.") {
        const pattern = "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$";
        
        if (city.match(pattern)){
        } else {
            return "Invalid City";
        }
    }

   return "";
 };