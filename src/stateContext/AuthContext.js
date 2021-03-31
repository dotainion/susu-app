import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../config/FirebaseConfig';
import { addMember, getMember, getMyGroup, getRequest, getSusuMembers } from '../database/FirestoreDb';
import { routes } from '../global/Routes';



const AuthContext = createContext();
export const useStore = () =>useContext(AuthContext);

export const AuthContextProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState();
    const [user, setUser] = useState({});

    //these are for notification on side menu
    const [requestFg, setRequestFg] = useState("");
    const [pendingRequest, setPendingRequest] = useState([]);
    const [susuGroups, setSusuGroups] = useState([]);

    //these are for list of user members of susu
    const [susuMembers, setSusuMembers] = useState([]);

    const login = async(email, password) =>{
        try{
            setIsLogin(await auth.signInWithEmailAndPassword(email, password));
            return true;
        }catch(error){
            console.log(error);
            return {error:error?.message};
        }
    }
    const register = async(email, password, data) =>{
        try{
            const cUser = await auth.createUserWithEmailAndPassword(email, password);
            setIsLogin(cUser);
            await addMember(data, cUser?.user?.uid);
            return true;
        }catch(err){
            console.log(err);
            return {error:err?.message};
        }
    }
    const signOut = async() =>{
        await auth.signOut();
        setUser(null);
        setIsLogin(null);
    }
    const recover = async(email) =>{
        try{
            await auth.sendPasswordResetEmail(email);
            return true;
        }catch(err){
            console.log(err);
            return {error:err?.message};
        }
    }

    //get the susu inclued groups in
    const initSusuGroups = async() =>{
        if (Object.keys(user || {}).length > 0){
            let groups = [];
            for (let id of user?.group || []){
                let myGroupAdmin = await getMember(id);
                let myGroup = await getMyGroup(id);
                for (let group of myGroup?.members || []){
                    if (group?.id === user?.id){
                        myGroupAdmin["deposit"] = group?.deposit || [];
                        break;
                    }
                }
                groups.push(myGroupAdmin);
            }
            setSusuGroups(groups);
        }
    }

    //get susu request and notify user
    const initPendingRequests = async()=>{
        if (Object.keys(user || {}).length > 0){
            const result = await getRequest(user?.id);
            if (result.length > 0) setRequestFg("green");
            else setRequestFg("");
            setPendingRequest(result);
        }
    };

    //get all user members
    const initSusuMembers = async() =>{
        if (Object.keys(user || {}).length > 0){
            const sMember = await getSusuMembers(user?.id);
            setSusuMembers(sMember?.members || []);
        }
    }

    const initFunctions = async() =>{
        initPendingRequests(); 
        initSusuMembers(); 
        initSusuGroups();
    }
    useEffect(()=>{
        auth.onAuthStateChanged(async(currentUser)=>{
            if (Object.keys(currentUser || {}).length > 0){
                const userData = await getMember(currentUser?.uid);
                userData["id"] = currentUser?.uid;
                setUser(userData);
                setIsLogin(currentUser);
                setLoading(false);
                initFunctions();
            }else setLoading(false);
        });
    },[isLogin]);
    return(
        <AuthContext.Provider value={{
            loading,
            isLogin,
            login,
            register,
            signOut,
            recover,
            user,
            requestFg,
            setRequestFg,
            pendingRequest,
            initFunctions,
            initPendingRequests,
            susuMembers,
            initSusuMembers,
            initSusuGroups,
            susuGroups,
            setSusuGroups,
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}