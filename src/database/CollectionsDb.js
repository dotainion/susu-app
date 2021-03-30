import { db } from "../config/FirebaseConfig"



export const addData = async(collection, data, uid=null) =>{
    if (uid) await db.collection(collection).doc(uid).set(data);
    else await db.collection(collection).add(data);
}

export const getData = async(collection, uid) =>{
    const data = await db.collection(collection).doc(uid).get();
    return data.data();
}

export const updateData = async(collection, data, uid) =>{
    await db.collection(collection).doc(uid).update(data);
}

export const deleteData = async(collection, uid) =>{
    await db.collection(collection).doc(uid).delete();
}

export const queryEqualBy1 = async(collection, query ,queryVal) =>{
    let dataTemp = [];
    const data = db.collection(collection).where(query,"==",queryVal);
    const dataList = await data.get();
    dataList.forEach((record)=>{
        dataTemp.push({id:record?.id, info:record.data()});
    });
    return dataTemp;
}

export const queryEqualBy2 = async(collection, query1 ,queryVal1, query2,queryVal2) =>{
    let dataTemp = [];
    const data = db.collection(collection).where(query1,"==",queryVal1).where(query2,"==",queryVal2);
    const dataList = await data.get();
    dataList.forEach((record)=>{
        dataTemp.push({id:record?.id, info:record.data()});
    });
    return dataTemp;
}