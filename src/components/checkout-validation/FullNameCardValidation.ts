export let isValidFullName: (fullName: String) => String = function (
    fullName: String
 ): String {

    if(fullName.length === 0) {
        return "Full name must not be empty";
    } 

    fullName = fullName.toLowerCase();
    for(let i = 0; i < fullName.length; i++) {

        let fullNameValue = fullName.codePointAt(i);
        if(fullNameValue) {
            if((fullNameValue <= 122 && fullNameValue >= 97) || fullNameValue === 32) {
            } else {
                return "Names can only have letters or spaces";
            }
        } else {
            return "Invalid name";
        }
    
    }
   return "";
 };