export let isValidProductDescription: (productDescription: String) => String = function (
    productDescription: String
  ): String {

    if(productDescription.length === 0) {
        return "Description must not be empty";
    }
    return "";
  };