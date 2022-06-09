export let isValidStateOrRegion: (stateOrRegion: String, country: String) => String = function (
    stateOrRegion: String, country: String
 ): String {

    let stateOrRegionText;

    if(stateOrRegion.length === 0) {
        stateOrRegionText = "State/Region must not be empty";
        return stateOrRegionText;
    } else if(country.toLowerCase() === "canada") {
        const pattern = "^((AB)|(BC)|(MB)|(N[BLTSU])|(ON)|(PE)|(QC)|(SK)|(YT))$";

        stateOrRegion = stateOrRegion.toUpperCase();

        if (stateOrRegion.match(pattern)){
            
        } else {
            return "Invalid state/region";
        }

    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "united states of america" || country.toLowerCase() === "U.S.") {
        const pattern = "^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$";
        
        stateOrRegion = stateOrRegion.toUpperCase();

        if (stateOrRegion.match(pattern)){
           
        } else {
            return "Invalid state/region";
        }
    } else if (stateOrRegion === stateOrRegionText) {
        return "";
    } 

   return "";
 };