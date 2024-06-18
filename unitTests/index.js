

const isPalindrome = (str) => {

    //If not a string passed in we need to return false
    if(typeof str !== 'string'){
        return false
    }
    //Transform all text to lowercase
    const lowerStr = str.toLowerCase()

    //Create a place to hold our new text
    let newText = ""

    //Iterate through string 
    for(const char of lowerStr){
        //CHeck to see if ASCII is b/w 97 & 122
        //Ensure only lowercase ones are being used
        //This will exclude all other charactes and symbols
        newText += char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123 ? char : ""
    }
    //Take our trimmed string and reassign it to str
    str = newText
    //get a rev text version of our str
    let revText = str.split("").reverse().join("")

    //Test for palindrome
    return str === revText ? true : false


};


const doubleInt = (num) => {
    return num * 2;
}

module.exports = {
    isPalindrome
}