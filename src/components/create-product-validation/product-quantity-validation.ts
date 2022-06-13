export let isValidProductQuantity: (productQuantity: String) => String = function (
    productQuantity: String,
    checkNumb: number = parseInt(<string>productQuantity)
  ): String {
    if(checkNumb == 0) {
        return "Quantity must not be empty";
    }
    if(checkNumb < 0){
        return "Cannot be less than 0";
    }
    if(productQuantity.length === 0) {
        return "Quantity must not be empty";
    }
    return "";
  };