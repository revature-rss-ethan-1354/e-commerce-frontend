export let isValidProductName: (productName: String) => String = function (
    productName: String
  ): String {

    if(productName.length === 0) {
        return "Name must not be empty";
    }
    return "";
  };