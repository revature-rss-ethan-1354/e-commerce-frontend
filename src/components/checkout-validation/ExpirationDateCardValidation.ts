export let isValidExpirationDate: (expirationDate: String) => String = function (
    expirationDate: String
 ): String {

    let month = expirationDate.charAt(0) + expirationDate.charAt(1);
    let year = expirationDate.charAt(2) + expirationDate.charAt(3);

    let currentMonth = (new Date()).getMonth()+1;
    let currentYear = (new Date()).getFullYear();

    let expirationMonthNumber = Number(month);
    let expirationYearNumber = Number(year);

    if(expirationDate.length === 0) {
        return "Expiration date must not be empty";
    } else if (expirationMonthNumber > 12 || expirationMonthNumber < 1) {
        return "Invalid month";
    }
    if(expirationDate.length > 4){
        return "Invalid date format";
    }

    if (expirationYearNumber == (currentYear - 2000)){
        if (expirationMonthNumber >= currentMonth) {

        } else {

            return "Card expired";
        }
    } 
    else if(expirationYearNumber > (currentYear - 2000)){

    }
    else{
        return "Card expired";
    }
    
    
   return "";
 };