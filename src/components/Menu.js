import {IonButton, IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonNote,} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { cogOutline, constructOutline, helpOutline, informationOutline, peopleOutline, personOutline, personSharp, searchOutline, settings, settingsOutline, stopwatchOutline } from 'ionicons/icons';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';




export const Menu = () => {
    const { user, isLogin, requestFg } = useStore();
    const history = useHistory();

    const pages = [
        {
            title: "My Account",
            icon: personOutline,
            iconColor: "",
            url: routes.myAccount
        },{
            title: "Join Susu",
            icon: peopleOutline,
            iconColor: "",
            url: routes.joinSusu
        },{
            title: "Create Susu",
            icon: stopwatchOutline,
            iconColor: "",
            url: routes.createSusu
        },{
            title: "Requests",
            icon: informationOutline,
            iconColor: requestFg,
            url: routes.request
        },{
            title: "Manage",
            icon: settingsOutline,
            iconColor: "",
            url: routes.manage
        },{
            title: "Help",
            icon: helpOutline,
            iconColor: "",
            url: routes.help
        },{
            title: "Settings",
            icon: constructOutline,
            iconColor: "",
            url: routes.settings
        }
    ];
    return (
        <IonMenu hidden={!isLogin} contentId="menu" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                <IonListHeader>Hi, {tools.capitalize(user?.name?.split(" ")?.[0] || "")}</IonListHeader>
                <IonNote>The SUSU-APP</IonNote>
                {pages.map((content, index) =>(
                        <IonMenuToggle autoHide={false} key={index}>
                            <IonItem className="menuItemContainer" routerLink={content.url} routerDirection="none" lines="none">
                                <IonIcon className="menuItemIcon" slot="start" icon={content.icon} style={{color:content.iconColor}} />
                                <IonLabel>{content.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

