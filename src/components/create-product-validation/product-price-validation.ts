export let isValidProductPrice: (productPrice: String) => String = function (
    productPrice: String,
    checkNumb: number = parseInt(<string>productPrice)
  ): String {
    if(checkNumb == 0) {
        return "Price must not be empty";
    }
    if(checkNumb < 0){
        return "Cannot be less than 0";
    }
    if(productPrice.length === 0) {
        return "Price must not be empty";
    }
    return "";
  };