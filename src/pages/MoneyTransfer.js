import { IonContent, IonLabel, IonList, IonPage } from '@ionic/react';
import React from 'react';



export const MoneyTransfer = () =>{
    return(
        <IonPage>
            <IonContent>
                <IonList class="floating-center" style={{fontSize:"40px",padding:"40px"}}>
                    <IonLabel>Not available in your area</IonLabel>
                </IonList>
            </IonContent>
        </IonPage>
    )
}