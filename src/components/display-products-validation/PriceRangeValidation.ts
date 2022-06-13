export let isValidPriceRange: (priceRange: number) => number= function (
    priceRange: number
 ): number {


    if(priceRange === 0) {
        return Number("");
    }

    if (priceRange.toString.length > 5) {
        return 1;
    }

   return 1;
 };