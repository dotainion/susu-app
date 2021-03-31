

class Credentials{
    secretKey = "asdfoasdmf-kadfy"
    rememberRef = "remember-login-credentials";
    remember(email, password){
        const encryptedPassword = btoa(this.secretKey+email+"-/-"+password+this.secretKey);
        window.localStorage.setItem(this.rememberRef,JSON.stringify(encryptedPassword));
    }
    forget(){
        window.localStorage.removeItem(this.rememberRef);
    }
    isRememer(){
        const encryptedData = window.localStorage.getItem(this.rememberRef);
        if (encryptedData){
            const decryptedData = atob(JSON.parse(encryptedData));
            return decryptedData.replace(this.secretKey,"").replace(this.secretKey,"");
        }
        return null;
    }
}
class Tools{
    creds = new Credentials();
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
    isEmailValid(email){
        const regix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (regix.test(email)) return true;
        return false;
    }
    handleDate(date){
        const newD = new Date(date).toDateString();
        const newT = new Date(date).toLocaleTimeString();
        return newD +" - "+ newT;
    }
    async toBase64(file){
        try{
            return await new Promise((res, rej) => {
                const reader = new FileReader();
                reader.onload = e => res(e.target.result);
                reader.onerror = e => rej(e);
                reader.readAsDataURL(file); 
            });
        }catch(error){
            console.log(error)
            return null;
        }
    };
}

export const tools = new Tools();