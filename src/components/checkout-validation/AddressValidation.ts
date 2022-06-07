export let isValidAddress: (stateOrRegion: String, zipOrPostal: String, country: String) => String = function (
    stateOrRegion: String, zipOrPostal: String, country: String
  ): String {

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let hasLetter = false;

    if(country.toLowerCase() === "canada") {
        if(zipOrPostal.length == 6) {
            
            for(let k = 0; k < alphabet.length; k++) {
                if(alphabet.charAt(k) == zipOrPostal.charAt(k)) {
                    hasLetter = true;
                }
            }
        } else if (zipOrPostal.length == 7) {

        }
    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "united states of america") {
        if(zipOrPostal.length == 5) {
            for(let i = 0; i < zipOrPostal.length; i++) {
                if(zipOrPostal.charAt(i) === '0' 
                || zipOrPostal.charAt(i) === '1'
                || zipOrPostal.charAt(i) === '2'
                || zipOrPostal.charAt(i) === '3'
                || zipOrPostal.charAt(i) === '4'
                || zipOrPostal.charAt(i) === '5'
                || zipOrPostal.charAt(i) === '6'
                || zipOrPostal.charAt(i) === '7'
                || zipOrPostal.charAt(i) === '8'
                || zipOrPostal.charAt(i) === '9') {
        
                } else {
                    return "ZIP code should have only numbers";
                }
            }
            return "";
        } else {
            return "Invalid ZIP code";
        }
    } else {
        return "";
    }

    return "";
  };