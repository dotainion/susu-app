class Tools{
    compare(compareItem, compareWith, returnifTrue, returnIfFalse){
        if (compareItem === compareWith) return returnifTrue;
        return returnIfFalse;
    }
    capitalize = (sentence) =>{
        let joiner = [];
        for (let word of sentence?.split?.(" ") || []){
            joiner.push(word?.charAt?.(0)?.toUpperCase?.() + word?.slice?.(1));
        }
        return joiner?.join?.(" ");
    }
    isNumber(value){
        try{
            if (value.match("^[0-9]+$")) return true;
        }catch{
            return false;
        }
    }
    validateNumber(value){
        if (value?.split?.("")?.length === 7){
            if (!value?.includes?.("1473")) return "1473" + value;
            return false;
        }else if (value?.split?.("")?.length === 11){
            return value;
        }else return false;
    }
}

export const tools = new Tools();