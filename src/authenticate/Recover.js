import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { alertCircleOutline, informationCircleOutline, pawSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { Loader } from '../widgets/Loader';


export const Recover = () =>{
    const { recover } = useStore();

    const history = useHistory();

    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState({msg:"",color:""});
    const [counter, setCounter] = useState(0);
    const [showWhenSend, setShowWhenSend] = useState({state:false,counter:""});

    const emailRef = useRef();

    const onSubmit = async() =>{
        setError({msg:"",color:""});
        if (!tools.isEmailValid(emailRef.current.value)){
            emailRef.current.setFocus();
            return setError({msg:"Invalid email",color:"red"});
        }
        const response = await recover(emailRef.current.value);
        if (response?.error) setError({msg:response?.error,color:"red"});
        else{
            let count = ""
            if (counter !== 0) count = `${counter}`;
            setShowWhenSend({state:true,counter:count});
            setCounter(counter + 1);
        }
    }
    const onEnterKeyPress = (e) =>{
        if (e.key === "Enter") onSubmit();
    }
    return(
        <IonPage className="page">
            <Loader isOpen={spinner}/>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="4" offset-md="7">
                            <IonCard class="creds-container" onKeyPress={onEnterKeyPress}>
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>SUSU</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Recover Account</IonLabel>
                                    </IonList>
                                    <IonList style={{padding:"0px"}}>
                                        <IonItem lines="none">
                                            <p>Enter your email that is link to your account.</p>
                                        </IonItem>
                                        <IonItem style={{borderRadius:"5px",border:"1px solid lightgray",borderColor:error.color}} lines="none">
                                            <IonLabel hidden={showWhenSend.state} position="floating">Enter email address</IonLabel>
                                            <IonInput hidden={showWhenSend.state} ref={emailRef} type="email"/>
                                            <div hidden={!showWhenSend.state}>
                                                <p hidden={!showWhenSend.counter}>Resend: <b>{showWhenSend.counter}</b></p>
                                                <p>Login to your {`{${emailRef.current?.value || ""}}`} account where you will recieve a link to reset your password.</p>
                                                <p>To resend click <b onClick={onSubmit} style={{color:"dodgerblue"}}>here</b>.</p>
                                            </div>
                                        </IonItem>
                                        <div hidden={!error.color} className="error" style={{textAlign:"left"}}>
                                            <IonIcon icon={alertCircleOutline}/>&nbsp;
                                            <span>{error.msg}</span>
                                        </div>
                                        <IonItem style={{marginTop:"40px"}} lines="none">
                                            <span className="pointer-link" style={{color:"rgb(29, 134, 29)"}} onClick={()=>history.push(routes.register)}>Create Account</span>
                                        </IonItem>
                                        <IonItem hidden={!showWhenSend} lines="none">
                                            <span className="pointer-link" style={{color:"blue"}} onClick={()=>history.push(routes.login)} slot="start">Login</span>
                                        </IonItem>
                                        <IonItem style={{marginBottom:"40px"}} lines="none">
                                            <IonButton hidden={!showWhenSend} slot="end" onClick={onSubmit} fill="outline">Next</IonButton>
                                            <IonButton hidden={showWhenSend} slot="end" onClick={onSubmit} fill="outline">Login</IonButton>
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