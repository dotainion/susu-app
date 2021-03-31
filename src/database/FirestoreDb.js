import { deleteDatabase } from "workbox-core/_private";
import { addData, deleteData, getData, queryEqualBy1, queryEqualBy2, updateData } from "./CollectionsDb"

const collection = {
    users: "users",
    requests: "requests",
    groups: "groups",
}

export const addMember = async(data,uid) =>{
    try{
        await addData(collection.users,data,uid);
    }catch(error){
        console.log(error);
    }
}

export const getMember = async(uid) =>{
    try{
        return await getData(collection.users,uid);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const getSusuMembers = async(uid) =>{
    try{
        return await getData(collection.groups,uid);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const updateSusuMembers = async(data, uid) =>{
    try{
        return await updateData(collection.groups,data,uid);
    }catch(error){
        console.log(error);
        return {};
    }
}

export const sendRequest = async(data) =>{
    try{
        const request = await queryEqualBy2(collection.requests,"requestBy",data?.requestBy,"requestTo",data?.requestTo);
        if (request.length > 0) return false;
        await addData(collection.requests,data);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const acceptRequest = async(data, uid) =>{
    console.log(data)
    try{
        let records = await getData(collection.groups,uid);
        for (let r of records?.members || []){
            if (r?.id === data?.id) return false;
        }
        const requestId = data?.reqDocId;
        delete data["reqDocId"];
        delete data["group"];
        let newRec = {members: records?.members || [data]};
        newRec?.push?.(data);
        await addData(collection.groups, newRec, uid);
        await declineRequest(requestId);
        await addGroup(data?.id, uid)
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

//add the goup user has join in the user member account
const addGroup = async(memberId, groupId) =>{
    try{
        const cUser = await getData(collection.users,memberId);
        let cGroup = cUser?.group || [];
        cGroup.push(groupId);
        await updateData(collection.users,{group:cGroup},memberId);
    }catch{

    }
}

export const declineRequest = async(uid) =>{
    try{
        await deleteData(collection.requests, uid);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}


export const getRequest = async(uid) =>{
    let requestHolder = [];
    try{
        const requsts = await queryEqualBy1(collection.requests,"requestTo",uid);
        for (let request of requsts){
            const nUser = await getMember(request?.info?.requestBy);
            requestHolder.push({info:nUser,id:request?.info?.requestBy,reqDocId: request?.id});
        }
        return requestHolder;
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getSusuAccounts = async(queryvalue) =>{
    console.log(queryvalue)
    let results = [];
    try{
        const email = await queryEqualBy2(collection.users,"start",true,"email",queryvalue);
        const number = await queryEqualBy2(collection.users,"start",true,"number",queryvalue);
        const name = await queryEqualBy2(collection.users,"start",true,"name",queryvalue);
        const city = await queryEqualBy2(collection.users,"start",true,"city",queryvalue);
        const address = await queryEqualBy2(collection.users,"start",true,"address",queryvalue);
        const susuName = await queryEqualBy2(collection.users,"start",true,"susuName",queryvalue);
        for (let e of email) results.push(e);
        for (let r of number) results.push(r);
        for (let n of name) results.push(n);
        for (let c of city) results.push(c);
        for (let a of address) results.push(a);
        for (let s of susuName) results.push(s);
        return results;
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getMyGroup = async(uid) =>{
    try{
        return await getData(collection.groups,uid);
    }catch(error){
        console.log(error);
        return false;
    }
}

export const startSusu = async(data, uid) =>{
    try{
        const cUser = await getMember(uid);
        if (!cUser?.start){
            await updateData(collection.users, data, uid);
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const rememberCredsDb = async(data, uid) =>{
    try{
        await updateData(collection.users, data, uid);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}