function crosswordSolver(crsWd, wds){
    if(inputValid(crsWd, wds)){

    }else{
        return "Error"
    }
}

function inputValid(crsWd, wds){
    if(
        noDoublewords(wds) &&
        noIllegalSymbols(crsWd) &&
        notMalformedBoard(crsWd, wds)
    ){
        return true;
    }
    return false;
}

function noDoublewords(wds){
    checked = [...new Set(wds)];
    if(checked.length === wds.length){
        return true;
    }
    return false;
}

//checks if board has only legal symbols
function noIllegalSymbols(str){
   let regX = /[^\\n.0-9]/g;
   let check = str.match(regX);
   if (check.length === 0){
    return true;
   }
   return false;
}

//checks if amount of start spots = amount of words
//also checks if the amount of words starting with letter i >= with start spots. If there is spot with 4 words starting, 
//and only 3 words with same start char, its faulty
function notMalformedBoard(crsWd, wds){
    const nums = [];
    const regX = /[1-9]/g;
    let count = 0;
    nums =  crsWd.match(regX);
    //theoretically, this is not ideal, as the numbers are sorted as strings. 12 smaller that 2.
    //but each position can have max only 4 words starting, so it is ok. 
    nums.sort();
    for (let i = 0; i < nums.length; i++){
        nums[i] = Number.parseInt(nums[i]);
    }
    let words = 0; 
    for (let i = 0; i < nums.length; i++){
        words +=nums[i];
    }

    if (words !== wds.length){
        return false; 
    }
    
    for (let i = 0; i < nums.length;){
        if (nums[i] > 4 ){
        return false;
        }
    }

    //remove 1-s as these are not applicable for following search
    for (let i = 0; i < nums.length;){
        if (nums[i] === 1 ){
            nums.splice(i,0);
        } else {
           i++;
        }
    }
    //also duplicate entries
    nums = [...new Set(nums)];

    //start from the end, the biggest number
    for (let i = nums.length; i > 0;){
        return checkOneStartAmount(nums[i], wds) == false; 
    }
}

//if there are less words with same starting letter, than required at crossword start spot, the puzzle is unsolvable 
function checkOneStartAmount(num, wds){
    for(let a = 0; a < wds.length; a++){
        count = 1; 
        for(let u = 0; u < wds.length; u++){
            if (a!==u && wds[a][0] === wds[u][0]){
                count++
            }
        }
        if (num > count) {
            return false; 
        }          
    }
    return true;
}
