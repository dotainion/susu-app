import { IonButton, IonContent, IonImg, IonLabel, IonList, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import brokenRobot from '../images/brokenRobot.jpg';
import { useStore } from '../stateContext/AuthContext';


export const Page404 = () =>{
    const { isLogin } = useStore();
    const history = useHistory();
    return(
        <IonPage>
            <IonContent>
                <IonList class="floating-center">
                    <IonImg src={brokenRobot}/>
                    <IonList class="header">
                        <IonLabel>Oops!!</IonLabel>
                    </IonList>
                    <IonList class="sub-header">
                        <IonLabel>Page not found</IonLabel>
                    </IonList>
                    <IonList>
                        <IonButton hidden={!isLogin} class="item-center" slot="end" fill="outline" onClick={()=>{
                            history.push(routes.myAccount)
                        }}>Go to my account</IonButton>
                        <IonButton hidden={isLogin} class="item-center" slot="end" fill="outline" onClick={()=>{
                            history.push(routes.login)
                        }}>Go to my login</IonButton>
                    </IonList>
                </IonList>
            </IonContent>
        </IonPage>
    )
}