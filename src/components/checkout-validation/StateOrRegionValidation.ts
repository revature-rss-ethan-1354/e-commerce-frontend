export let isValidStateOrRegion: (stateOrRegion: String, country: String) => String = function (
    stateOrRegion: String, country: String
 ): String {

    if(stateOrRegion.length === 0) {
        return "State/Region must not be empty";
    }

    if(country.toLowerCase() === "canada") {
        const pattern = "^((AB)|(BC)|(MB)|(N[BLTSU])|(ON)|(PE)|(QC)|(SK)|(YT))$";

        if (stateOrRegion.match(pattern)){
            
        } else {
            return "Invalid state or Region";
        }

    } else if (country.toLowerCase() === "united states" || country.toLowerCase() === "usa" || country.toLowerCase() === "united states of america" || country.toLowerCase() === "U.S.") {
        const pattern = "^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$";
        
        if (stateOrRegion.match(pattern)){
           
        } else {
            return "Invalid state or Region";
        }
    }

   return "";
 };