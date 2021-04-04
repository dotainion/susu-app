import { IonContent,IonIcon,IonItem,IonLabel,IonList,IonListHeader,IonMenu,IonMenuToggle,IonNote } from '@ionic/react';
import { useHistory } from 'react-router';
import { content } from '../contents/Contents';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';




export const Menu = () => {
    const { user, isLogin, requestFg, onShare } = useStore();
    const history = useHistory();
    content.pages[3].iconColor = requestFg;
    
    return (
        <IonMenu hidden={!isLogin} contentId="menu" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                <IonListHeader>Hi, {tools.capitalize(user?.name?.split(" ")?.[0] || "")}</IonListHeader>
                <IonNote>DCash Susu-App</IonNote>
                {content.pages.map((content, index) =>(
                    <IonMenuToggle autoHide={false} key={index}>
                        <IonItem className="menu-pointer" onClick={()=>{if (typeof content.url === 'function') content.url(onShare)}} routerLink={typeof content.url === "string" && content.url} routerDirection="none" lines="none">
                            <IonIcon slot="start" icon={content.icon} style={{color:content.iconColor}} />
                            <IonLabel>{content.title}</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

