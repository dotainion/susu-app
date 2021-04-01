import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Header } from '../components/Header';
import { pages } from '../components/Menu';
import { useStore } from '../stateContext/AuthContext';


export const MobileMenu = () =>{
    const { user, isLogin, requestFg, onShare } = useStore();
    const history = useHistory();
    pages[3].iconColor = requestFg;
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
                                        <IonLabel>Menu</IonLabel>
                                    </IonItem>
                                    <IonList>
                                        {
                                            pages.map((page, key)=>(
                                                <IonList class="inline-container pointer" key={key}>
                                                    <IonCard onClick={()=>{if (typeof page.url === "function") page.url(onShare,user); else history.push(page.url)}} class="mobile-click">
                                                        <IonIcon class="mobile-icon" icon={page.icon}/>
                                                        <IonItem class="mobile-text">
                                                            <div className="item-center">{page.title}</div>
                                                        </IonItem>
                                                    </IonCard>
                                                </IonList>
                                            ))
                                        }
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