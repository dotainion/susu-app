import {IonButton, IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonNote,} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { cogOutline, constructOutline, helpOutline, informationOutline, peopleOutline, personOutline, personSharp, searchOutline, settings, settingsOutline, shareSocialOutline, stopwatchOutline } from 'ionicons/icons';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';



export const pages = [
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
        iconColor: "",
        url: routes.request
    },{
        title: "Manage",
        icon: settingsOutline,
        iconColor: "",
        url: routes.manage
    },{
        title: "Send Invite",
        icon: shareSocialOutline,
        iconColor: "",
        url: (func, param)=>{func(param)}
    },{
        title: "Help & FAQ's",
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

export const Menu = () => {
    const { user, isLogin, requestFg, onShare } = useStore();
    const history = useHistory();
    pages[3].iconColor = requestFg;
    
    return (
        <IonMenu hidden={!isLogin} contentId="menu" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                <IonListHeader>Hi, {tools.capitalize(user?.name?.split(" ")?.[0] || "")}</IonListHeader>
                <IonNote>The SUSU-APP</IonNote>
                {pages.map((content, index) =>(
                        <IonMenuToggle autoHide={false} key={index}>
                            <IonItem className="menuItemContainer" onClick={()=>{if (typeof content.url === 'function') content.url(onShare,user?.id)}} routerLink={typeof content.url === "string" && content.url} routerDirection="none" lines="none">
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

