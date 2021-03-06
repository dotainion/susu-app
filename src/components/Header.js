import { IonButtons, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVerticalOutline, gridOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';


export const Header = () =>{
    const { signOut } = useStore();
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState(false);
    const cap = () =>{
        return history.location.pathname.replace("/","").replace("-"," ");
    }
    const taggleDropdown = () =>{
        if (showDropdown)setShowDropdown(false);
        else setShowDropdown(true);
    }
    return(
        <IonHeader class="bg">
            <IonToolbar>
                <IonButtons hidden slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonItem class="show-on-mobile" slot="start" lines="none">
                    <IonIcon onClick={()=>history.push(routes.mobileMenu)} class="settigns-btn" icon={gridOutline}/>
                </IonItem>
                <IonTitle>{tools.capitalize(cap())}</IonTitle>
                <IonItem slot="end" lines="none">
                    <IonIcon onClick={taggleDropdown} class="settigns-btn" icon={ellipsisVerticalOutline}/>
                </IonItem>
            </IonToolbar>
            <IonList hidden={!showDropdown} onClick={taggleDropdown} className="backdrop">
                <IonList className="float-right">
                    <IonLabel onClick={signOut} className="pointer list-block">Logout</IonLabel>
                </IonList>
            </IonList>
        </IonHeader>
    )
}