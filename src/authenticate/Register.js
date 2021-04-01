import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react';
import { pawSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { ItemSelect } from '../widgets/ItemSelect';
import { Loader } from '../widgets/Loader';
import { getStates} from 'country-state-picker';
import { tools } from '../tools/Tools';


export const Register = () =>{
    const { register } = useStore();

    const history = useHistory();

    //display input my sections
    const [inputToggle, setInputToggle] = useState({first:true,second:false,third:false});

    const [error, setError] = useState("");
    const [spinner, setSpinner] = useState(false);

    const nameRef = useRef();
    const nextOfKinRef = useRef();
    const numberRef = useRef();
    const idCardRef = useRef();
    const genderRef = useRef();
    const cityRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const bankNumberRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const checks = () =>{
        if (!passwordRef.current.value){
            setError("Password Invalid");
            return false; 
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            setError("Password Mistmatch");
            return false; 
        }
        if (!cityRef.current.value){
            setError("Invalid City");
            return false;
        }
        if (!addressRef.current.value){
            setError("Invalid Address");
            return false;
        }
        if (!nameRef.current.value){
            setError("Invalid Name");
            return false;
        }
        if (!tools.isNumber(numberRef.current.value)){
            setError("Invalid Phone Number");
            return false;
        }else{
            const validatedNumber = tools.validateNumber(numberRef.current.value);
            if (!validatedNumber){
                setError("Invalid Phone Number");
                return false;
            }
            numberRef.current.value = validatedNumber;
        }
        return true;
    }

    const onSubmit = async() =>{
        if (checks()){
            const regist = {
                name: nameRef.current.value?.toLowerCase?.() || "",
                nextOfKin: nextOfKinRef.current.value?.toLowerCase?.() || "",
                number: numberRef.current.value?.toLowerCase?.() || "",
                idCard: idCardRef.current.value?.toLowerCase?.() || "",
                gender: genderRef.current.value?.toLowerCase?.() || "",
                city: cityRef.current.value?.toLowerCase?.() || "",
                email: emailRef.current.value?.toLowerCase?.() || "",
                address: addressRef.current.value?.toLowerCase?.() || "",
                bankNumer: bankNumberRef.current.value?.toLowerCase?.() || "",
            }
            const response = await register(emailRef.current.value, passwordRef.current.value, regist);
            if (response?.error) setError(response?.error);
            else history.push(routes.welcome);
        }
    }

    const onEnterKeyPress = (e) =>{
        if (e.key === "Enter") onSubmit();
    }

    const toggle = (cmd) =>{
        if (cmd.includes("first")) setInputToggle({first:true,second:false,third:false});
        if (cmd.includes("second")) setInputToggle({first:false,second:true,third:false});
        if (cmd.includes("third")) setInputToggle({first:false,second:false,third:true});
    }
    
    return(
        <IonPage className="page">
            <Loader isOpen={spinner}/>
            <IonContent>
                <IonGrid class="full-height">
                    <IonRow>
                        <IonCol size-md="4" offset-md="7">
                            <IonCard class="creds-container" onKeyPress={onEnterKeyPress}>
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>SUSU</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header" style={{padding:"0px",margin:"0px"}}>
                                        <IonLabel>Sign Up</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <IonList>
                                        <div hidden={!inputToggle.first}>
                                            <IonItemDivider>Registration</IonItemDivider>
                                            <IonItem>
                                                <IonLabel position="floating">Full Name</IonLabel>
                                                <IonInput ref={nameRef} type="text"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Next of Kin</IonLabel>
                                                <IonInput ref={nextOfKinRef} type="text"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Phone Number</IonLabel>
                                                <IonInput ref={numberRef} type="number"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Id Card</IonLabel>
                                                <IonInput ref={idCardRef}type="text"/>
                                            </IonItem>
                                        </div>
                                        <div hidden={!inputToggle.second}>
                                            <IonItemDivider>Gender</IonItemDivider>
                                            <IonRadioGroup ref={genderRef}>
                                                <IonItem>
                                                    <IonRadio value="Male"/>&nbsp;
                                                    <IonLabel>Male</IonLabel>
                                                </IonItem>
                                                <IonItem>
                                                    <IonRadio value="Felmale"/>&nbsp;
                                                    <IonLabel>Female</IonLabel>
                                                </IonItem>
                                            </IonRadioGroup>
                                            <ItemSelect
                                                label="City"
                                                options={getStates("gd")}
                                                itemSelectRef={cityRef}
                                            />
                                            <IonItem>
                                                <IonLabel position="floating">Address</IonLabel>
                                                <IonInput ref={addressRef} type="text"/>
                                            </IonItem>
                                        </div>
                                        <div hidden={!inputToggle.third}>
                                            <IonItem>
                                                <IonLabel position="floating">Bank Number</IonLabel>
                                                <IonInput ref={bankNumberRef} type="text"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput ref={emailRef} type="email"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Password</IonLabel>
                                                <IonInput ref={passwordRef} type="password"/>
                                            </IonItem>
                                            <IonItem>
                                                <IonLabel position="floating">Confirm Password</IonLabel>
                                                <IonInput ref={confirmPasswordRef} type="password"/>
                                            </IonItem>
                                        </div>
                                        <IonItem>
                                            <span className="pointer-link" onClick={()=>history.push(routes.login)} style={{color:"rgb(29, 134, 29)"}}  slot="start">Login Instead</span>
                                        </IonItem>
                                        <IonItem>
                                            <IonButton hidden={!inputToggle.second} fill="outline" onClick={()=>toggle("first")} color="primary" slot="start">Back1</IonButton>
                                            <IonButton hidden={!inputToggle.third} fill="outline" onClick={()=>toggle("second")} color="primary" slot="start">Back2</IonButton>
                                            <IonButton hidden={!inputToggle.first} fill="outline" onClick={()=>toggle("second")} color="primary" slot="end">Next1</IonButton>
                                            <IonButton hidden={!inputToggle.second} fill="outline" onClick={()=>toggle("third")} color="primary" slot="end">Next2</IonButton>
                                            <IonButton hidden={!inputToggle.third} fill="outline" onClick={onSubmit} color="primary" slot="end">Register</IonButton>
                                        </IonItem>
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