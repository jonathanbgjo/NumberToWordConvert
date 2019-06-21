function numberToWord(input){
    //dictionaries/objects to identify number/word pair
    let numberWordDict = {
        ".":"point",
        0: "",
        1:'one',
        2:"two",
        3:"three",
        4:"four",
        5:"five",
        6:"six",
        7:"seven",
        8:"eight",
        9:"nine",  
    };
    let numberWordDictDict2 = {
        0:"",
        10:"ten",
        11:"eleven",
        12:"twelve",
        13:"thirteen",
        14:"fourteen",
        15:"fifteen",
        16:"sixteen",
        17:"seventeen",
        18:"eighteen",
        19:"nineteen",
        2:"twenty",
        3:"thirty",
        4:"fourty",
        5:"fifty",
        6:"sixty",
        7:"seventy",
        8:"eighty",
        9:"ninety",
    };
    //initalize count, str, input array.   Placement used to keep track of what to put at end of str
    let count = 0; str = ""; inputArray = []; placement = ["", "thousand", "million", "billion"];
    
    //split each number as a separate index in array so its easier to process
    inputArray = input.split("");

    //finding length of input to have count variable for placementarray index    could add trillion or more, would just need to add more ifs and add to placement array
    let length = inputArray.length;
    if(length >= 1 && length <= 3){
        count = 0;
    }
    if(length >= 4 && length <= 6){
        count = 1;
    }
    if(length >= 7 && length <= 9){
        count = 2;
    }  
    if(length >= 10 && length <= 12){
        count = 3;
    }
    
    // to see if how many leading digits to check first
    let digits = length%3;

    //runner to track/search indexes as we go through loop
    let runner = 0;

    //if number is bigger than billion, wouldnt go in while loop
    while(count >= 0){
        //first two if checks are only based on the first leading numbers  i.e. the 12 in 12,000     or     1 in 1,000. also getting rid of cases where 0 makes things weird
        if(digits ==1){
            if(inputArray[runner] == 0){

            }
            else{
                str += numberWordDict[inputArray[runner]] + " " + placement[count];
            }
            //increment index by however many leading digits, in this case 1
            runner+=1;
            //all future digits will be 3, or should be out of loop i.e 12,000,000,000 (2 leading digits, 3 following digits, 3 following digits)
            digits = 3;
        }
        else if(digits == 2){
            //need to check if 2nd digit is a 1 becuase of the weird eleven/twelve
            if(inputArray[runner] == 0 && inputArray[runner+1] == 0){
                //skip if both are zeroes
                //i.e 00123 == 123
            }
            else if(inputArray[runner] == 1){
                //javascript is lenient enough to combine inputArray[runner+1] + inputArray[runner+2], otherwise would probably just set another variable equal to both indexes and use that
                str += numberWordDictDict2[inputArray[runner] + inputArray[runner+1]] + " " + placement[count];
            }
            else{
                str += numberWordDictDict2[inputArray[runner]] + " " + numberWordDict[inputArray[runner+1]] + " " + placement[count];
            }
             //increment index by however many leading digits, in this case 2
            runner+=2;
            digits = 3;
        }
        else if(digits == 3  || digits == 0){
            //deal with all 0 cases
            if(inputArray[runner] == 0){
                if(inputArray[runner+1] == 0 && inputArray[runner+2] == 0){
                    //if all zeroes, need to skip
                }
                //in the case where 12,012  we need to make sure it doesnt become  12 thousand 0 HUNDRED tweleve
                else if(inputArray[runner+1] == 1){
                    //javascript is lenient enough to combine inputArray[runner+1] + inputArray[runner+2], otherwise would probably just set another variable equal to both indexes and use that
                    str += " " + numberWordDict[inputArray[runner]] + numberWordDictDict2[inputArray[runner+1] + inputArray[runner+2]] + " " + placement[count];
                }
                else{
                    str += " " +numberWordDict[inputArray[runner]] + numberWordDictDict2[inputArray[runner+1]] + " " + numberWordDict[inputArray[runner+2]] + " " + placement[count];
                }
            }
            //need to check if 2nd digit is a 1, becuase of the weird eleven/twelve etc.
            else if(inputArray[runner+1] == 1){
                //javascript is lenient enough to combine inputArray[runner+1] + inputArray[runner+2], otherwise would probably just set another variable equal to both indexes and use that
                str += " " + numberWordDict[inputArray[runner]] + " hundred " + numberWordDictDict2[inputArray[runner+1] + inputArray[runner+2]] + " " + placement[count];
            }
            else{
                str += " " +numberWordDict[inputArray[runner]] + " hundred " + numberWordDictDict2[inputArray[runner+1]] + " " + numberWordDict[inputArray[runner+2]] + " " + placement[count];
            }

            //want to check next 3 indexes in array
            runner +=3;
            digits = 3;
        }

        //keep track of how many loops left and which placement to add at the end
        count --;
    }

    return str;
}

console.log("12012"+ " "+ numberToWord("12012"))
console.log("215"+ " "+ numberToWord("215"));
console.log("21000"+ " "+ numberToWord("21000"));
console.log("21213"+ " "+ numberToWord("21213"));
console.log("2134"+ " "+ numberToWord("2134"));
console.log("21000123"+ " "+ numberToWord("21000123"));
console.log("010134"+ " "+ numberToWord("010134"));
console.log("000134"+ " "+ numberToWord("000134"));
console.log("00134"+ " "+ numberToWord("00134"));
console.log("0134"+ " "+ numberToWord("0134"));
console.log("213421345"+ " "+ numberToWord("213421345"));
console.log("11111111"+ " "+ numberToWord("11111111"));
console.log("0000001"+ " "+ numberToWord("0000001"));
console.log("001001001001"+ " "+ numberToWord("001001001001"))