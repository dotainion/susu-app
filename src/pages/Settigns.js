import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { getStates } from 'country-state-picker';
import { constructOutline } from 'ionicons/icons';
import { useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { updateMember } from '../database/FirestoreDb';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { ItemInput } from '../widgets/ItemInput';
import { ItemSelectOption } from '../widgets/ItemSelectOption';


export const Settings = () =>{
    const { user, changePassword, login } = useStore();

    const nameRef = useRef();
    const nextOfKinRef = useRef();
    const numberRef = useRef();
    const idCardRef = useRef();
    const genderRef = useRef();
    const cityRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const bankNumberRef = useRef();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    //update user information
    const updateUserInfo = async() =>{
        const userInfoUpdate = {
            name: nameRef.current.value?.toLowerCase?.() || "",
            nextOfKin: nextOfKinRef.current.value?.toLowerCase?.() || "",
            number: numberRef.current.value?.toLowerCase?.() || "",
            idCard: idCardRef.current.value?.toLowerCase?.() || "",
            gender: genderRef.current.value?.toLowerCase?.() || "",
            city: cityRef.current.value?.toLowerCase?.() || "",
            address: addressRef.current.value?.toLowerCase?.() || "",
        }
        await updateMember(userInfoUpdate, user?.id);
        tools.alert(true,"Updated");
    }

    //update security credentials
    const updateSecurity = async() =>{
        if (!currentPasswordRef.current.value) return tools.alert(false,"Provide existing password");
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            return tools.alert(false,"Password mistmatch");
        }
        const response = await login(emailRef.current.value, currentPasswordRef.current.value);
        if (response?.error) return tools.alert(false,response?.error);
        const onreturn = await changePassword(newPasswordRef.current.value);
        tools.alert(true,"Updated");
    }

    //update banking information
    const updateBankInfo = async() =>{
        const bankUpdate = {
            bankNumer: bankNumberRef.current.value?.toLowerCase?.() || "",
        }
        await updateMember(bankUpdate, user?.id);
        tools.alert(true,"Updated");
    }

    //add values form database to element inputs
    useEffect(()=>{
        nameRef.current.value = tools.capitalize(user?.name) || "";
        nextOfKinRef.current.value = tools.capitalize(user?.nextOfKin) || "";
        numberRef.current.value = tools.capitalize(user?.number) || "";
        idCardRef.current.value = tools.capitalize(user?.idCard) || "";
        genderRef.current.value = tools.capitalize(user?.gender) || "";
        cityRef.current.value = tools.capitalize(user?.city) || "";
        emailRef.current.value = tools.capitalize(user?.email) || "";
        addressRef.current.value = tools.capitalize(user?.address) || "";
        bankNumberRef.current.value = tools.capitalize(user?.bankNumer) || "";
        console.log(user)
    },[]);
    return(
        <IonPage className="page">
            <Header/>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Settings</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header" style={{padding:"0px"}}>
                                        <IonIcon style={{fontSize:"40px"}} icon={constructOutline}/>
                                    </IonList>
                                    <IonList style={{padding:"0px"}}>
                                        <div className="settings-card">
                                            <IonItemDivider>User Information</IonItemDivider>
                                            <div className="rev-flexed">
                                                <ItemInput label="Full Name" inputRef={nameRef}/>
                                                <ItemInput label="Phone Number" inputRef={numberRef}/>
                                            </div>
                                            <div className="rev-flexed">
                                                <ItemInput label="Next of Kin" inputRef={nextOfKinRef}/>
                                                <ItemInput label="Id Card" inputRef={idCardRef}/>
                                            </div>   
                                            <div className="rev-flexed">
                                                <ItemSelectOption inputRef={cityRef} options={getStates("gd")} label="City"/>
                                                <ItemInput label="Address" inputRef={addressRef}/>
                                            </div>
                                            <ItemSelectOption inputRef={genderRef} options={["Male","Female"]} label="Gender"/>
                                            <IonItem lines="full">
                                                <IonButton onClick={updateUserInfo} color="medium" slot="end" fill="outline">Update</IonButton>
                                            </IonItem>
                                        </div>                                        
                                        <div className="settings-card">
                                            <IonItemDivider>Security</IonItemDivider>
                                            <div className="rev-flexed">
                                                <ItemInput disabled label="Email" inputRef={emailRef}/>
                                                <ItemInput label="Current Password" inputRef={currentPasswordRef}/>
                                            </div>
                                            <div className="rev-flexed">
                                                <ItemInput label="New Password" inputRef={newPasswordRef}/>
                                                <ItemInput label="Confirm Password" inputRef={confirmPasswordRef}/>
                                            </div>
                                            <IonItem lines="full">
                                                <IonButton onClick={updateSecurity}  color="medium" slot="end" fill="outline">Update</IonButton>
                                            </IonItem>
                                        </div>
                                        <div className="settings-card">
                                            <IonItemDivider>Bank Information</IonItemDivider>
                                            <ItemInput label="Bank Number" inputRef={bankNumberRef}/>
                                            <IonItem lines="full">
                                                <IonButton onClick={updateBankInfo}  color="medium" slot="end" fill="outline">Update</IonButton>
                                            </IonItem>
                                        </div>
                                    </IonList>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}