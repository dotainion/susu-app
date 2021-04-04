import { IonButton, IonCard, IonCardContent, IonCheckbox, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { Loader } from '../widgets/Loader';


export const Login = () =>{
    const history = useHistory();

    const { login } = useStore();

    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const rememberCreds = useRef();

    const onSubmit = async() =>{
        setSpinner(true);
        setError("");
        const response = await login(emailRef.current.value, passwordRef.current.value);
        if (response.error){
            setError(response.error);
            setSpinner(false);
        }else{
            if (rememberCreds.current.checked){
                tools.creds.remember(emailRef.current.value, passwordRef.current.value);
            }else{
                tools.creds.forget();
            }
            setSpinner(false);
            history.push(routes.welcome);
        }
    }
    const onEnterKeyPress = (e) =>{
        if (e.key === "Enter") onSubmit();
    }
    useEffect(() =>{
        const decrptedPassword = tools.creds.isRememer();
        console.log(decrptedPassword)
        if (decrptedPassword?.split?.("-/-")?.length > 0){
            const [email, password] = decrptedPassword?.split?.("-/-");
            emailRef.current.value = email;
            passwordRef.current.value = password;
            rememberCreds.current.checked = true;
        }else rememberCreds.current.checked = false;
    },[]);
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
                                        <IonCheckbox ref={rememberCreds}/>
                                        <IonLabel>&nbsp;Remember Me</IonLabel>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <span className="pointer-link" style={{color:"red"}} onClick={()=>history.push(routes.recover)}>Forget password?</span>
                                    </IonItem>
                                    <IonItem>
                                        <span className="pointer-link" style={{color:"rgb(29, 134, 29)"}} onClick={()=>history.push(routes.register)} slot="start">Create Account</span>
                                    </IonItem>
                                    <IonItem lines="none">
                                        <IonButton slot="end" onClick={onSubmit} fill="outline">Login</IonButton>
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