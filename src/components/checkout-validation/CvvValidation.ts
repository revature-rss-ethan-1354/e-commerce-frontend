export let isValidCvv: (cvv: String) => String = function (
    cvv: String
 ): String {
    
    if(cvv.length === 0) {
        return "Card number must not be empty";
    } 

    if (cvv.length != 3){
        return "CVV must be three digits";
    } else {
        for (let i = 0; i < cvv.length; i++) {
            let cvvValue = cvv.codePointAt(i);
            if(cvvValue) {
                if(cvvValue <= 57 && cvvValue >= 48) {
                } else {
                    return "CVV must be only digits";
                }
            } else {
                return "CVV invalid";
            }
        }
    }

   return "";
 };