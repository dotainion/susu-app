import { IonButton, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { Loader } from '../widgets/Loader';


export const Login = () =>{
    const history = useHistory();

    const { login } = useStore();

    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = async() =>{
        setSpinner(true);
        const response = await login(emailRef.current.value, passwordRef.current.value);
        if (response.error){
            setError(response.error);
            setSpinner(false);
        }else{
            history.push(routes.welcome);
            setSpinner(false);
        }
    }
    return(
        <IonPage className="page">
            <Loader isOpen={spinner}/>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size-md="4" offset-md="7">
                            <IonCard class="creds-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>SUSU</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Login</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <IonItem class="item-boxed" lines="full">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput ref={emailRef} type="email"/>
                                    </IonItem>
                                    <IonItem class="item-boxed" lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput ref={passwordRef} type="password"/>
                                    </IonItem>
                                    <IonItem>
                                        <IonCheckbox/>
                                        <IonLabel>&nbsp;Remember Me</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <span className="pointer-link" onClick={()=>history.push(routes.recover)} color="danger">Forget password?</span>
                                    </IonItem>
                                    <IonItem>
                                        <span className="pointer-link" onClick={()=>history.push(routes.register)} color="primary" slot="start">Create Account</span>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton slot="end" color="medium" onClick={onSubmit} fill="outline">Login</IonButton>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}