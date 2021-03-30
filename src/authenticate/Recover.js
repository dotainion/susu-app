import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { pawSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { Loader } from '../widgets/Loader';


export const Recover = () =>{
    const { recover } = useStore();

    const history = useHistory();

    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
                                        <IonLabel>Recover Account</IonLabel>
                                    </IonList>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonList>

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