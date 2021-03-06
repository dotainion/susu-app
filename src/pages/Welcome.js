import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { Header } from '../components/Header';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import img from '../images/save.jpg';
import { routes } from '../global/Routes';
import { useHistory } from 'react-router';


export const Welcome = () =>{
    const { user } = useStore();
    const history = useHistory();
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
                                        <IonLabel>Welcome to the susu app</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Hi {tools.capitalize(user?.name)}, We appreciate you for choosing this app. we do hope you enjoy our service.</IonLabel>
                                    </IonList>
                                    <IonList>
                                        <div className="welcome-logo-container item-center">
                                            <div className="welcome-logo-sub">
                                                <div className="welcome-logo-mini-sub">
                                                    <div className="floating-center welcome-logo-text">
                                                        <div style={{fontSize:"30px",whiteSpace:"nowrap"}}>Susu App</div>
                                                        <label style={{fontSize:"20px"}}>DCash</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </IonList>
                                    <IonList>
                                        <IonButton class="item-center show-on-mobile" onClick={()=>history.push(routes.mobileMenu)} size="small" fill="outline">Continue...</IonButton>
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