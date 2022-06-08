export let isValidZipOrPostal: (zipOrPostal: String, country: String) => String = function (
    zipOrPostal: String, country: String
  ): String {

    if(zipOrPostal.length === 0) {
        return "Zip/Postal code must not be empty";
    }

    if(country.toLowerCase() === "canada") {
        let zipOrPostalNumber;
        let zipOrPostalValue;
    
        zipOrPostal = zipOrPostal.toLowerCase();
        
        if(zipOrPostal.length === 7) {
            zipOrPostalValue = zipOrPostal.replace(/\s/g, "");
        } else if(zipOrPostal.length > 7) {
            return "Invalid Postal Code";
        } else {
            zipOrPostalValue = zipOrPostal;
        }

        if (zipOrPostalValue.length === 6) {
            for(let i = 0; i < zipOrPostalValue.length; i++) {
                let variable = i % 2;
    
                if (variable == 0) {
                    zipOrPostalNumber = zipOrPostalValue.codePointAt(i);
                    if(zipOrPostalNumber) {
                        
                        if(zipOrPostalNumber <= 122 && zipOrPostalNumber >= 97) {
                            
                        } else {
                            return "Invalid Postal Code";
                        }
                    } else {
                        return "Invalid Postal Code";
                    }
                } else if (variable == 1) {
                    zipOrPostalNumber = zipOrPostalValue.codePointAt(i);
                    if(zipOrPostalNumber) {
                        if(zipOrPostalNumber <= 57 && zipOrPostalNumber >= 48) {
                            
                        } else {
                            return "Invalid Postal Code";
                        }
                    } else {
                        return "Invalid Postal Code";
                    }
                }
            }
        } else {
            return "Invalid Postal Code";
        }
        
    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "united states of america" || country.toLowerCase() === "U.S.") {
        if(zipOrPostal.length == 5) {
            for(let i = 0; i < zipOrPostal.length; i++) {
                let zipOrPostalValue = zipOrPostal.codePointAt(i);
                if(zipOrPostalValue) {
                    if(zipOrPostalValue <= 57 && zipOrPostalValue >= 48) {
                        
                    } else {
                        return "ZIP code should have only numbers";
                    }
                } else {
                    return "Invalid ZIP Code";
                }
            }
        } else {
            return "Invalid ZIP Code";
        }
    } else {
        return "";
    }

    return "";
  };