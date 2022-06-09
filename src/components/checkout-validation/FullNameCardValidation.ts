export let isValidFullName: (fullName: String) => String = function (
    fullName: String
 ): String {

    if(fullName.length === 0) {
        return "Full name must not be empty";
    } 

    for(let i = 0; i < fullName.length; i++) {
        let fullNameValue = fullName.codePointAt(i);
        if(fullNameValue) {
            if((fullNameValue <= 122 && fullNameValue >= 97) || fullNameValue === 32) {
                console.log(fullNameValue);
            } else {
                console.log(fullNameValue);
                return "Names can only have letters and/or spaces";
            }
        } else {
            return "Invalid name";
        }
    
    }
   return "";
 };