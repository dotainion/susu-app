import { IonButton, IonContent, IonItem, IonPage } from '@ionic/react';



export const Test = () =>{
    const share = () =>{
        navigator.share({
            title: document.title,
            text: "hello world",
            url: window.location.href
        }).then(()=>{
            alert("Successful share");
        }).catch((err)=>{
            alert("Unsuccessful share");
        })
    }
    return(
        <IonPage>
            <IonContent>
                <IonItem>
                    <IonButton onClick={share}>Test Stare</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
    )
}