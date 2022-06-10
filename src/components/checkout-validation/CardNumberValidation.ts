export let isValidCardNumber: (cardNumber: String) => String = function (
    cardNumber: String
 ): String {

    if(cardNumber.length === 0) {
        return "Card number must not be empty";
    } 

    const pattern = "^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$";
    if (cardNumber.match(pattern)){
        
    } else {
        return "Invalid card number";
    }
    
   return "";
 };