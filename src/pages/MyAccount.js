import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { useRef, useState } from 'react';
import { Header } from '../components/Header';
import { routes } from '../global/Routes';
import { useStore } from '../stateContext/AuthContext';
import { tools } from '../tools/Tools';
import { Payments } from '../widgets/Payments';


export const MyAccount = () =>{
    const { user, susuGroups } = useStore();

    const [payData, setPayData] = useState({state:false,data:null});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const payRef = useRef();

    const onOpenPaymentForm = (record) =>{
        setPayData({state:true,data:record});
    };
    return(
        <IonPage className="page">
            <Header/>

            <Payments 
                isOpen={payData.state} 
                record={payData.data}
                onClose={()=>setPayData({state:false,data:null})}
                onSubmit={(obj)=>setShowAlert(true)}
            />

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass='my-custom-class'
                header={'Alert!!'}
                subHeader={'Cannot continue.'}
                message={'Payment is not yet available in your area.'}
                buttons={["okay"]}
            />

            <IonContent>
                <IonGrid class="background-image">
                    <IonRow>
                        <IonCol size-md="8" offset-md="2">
                            <IonCard class="page-container">
                                <IonCardContent>
                                    <IonItem class="header" lines="none">
                                        <IonLabel>Account</IonLabel>
                                    </IonItem>
                                    <div className="sub-header">My account</div>
                                    <div className="error">{error}</div>
                                    <div className="success">{success}</div>
                                    <IonList>
                                        <IonItemDivider color="primary"><b>My Susu</b></IonItemDivider>
                                        <IonList hidden={!user?.start}>
                                            <div className="tag-container">
                                                <div>
                                                    <div className="tag-in">Susu Name</div>
                                                    <div className="tag-out">Cost Per Month</div>
                                                    <div className="tag-in">Due Per Month</div>
                                                    <div className="tag-out">Duration</div>
                                                </div>
                                                <div>
                                                    <div className="tag-in">{user?.susuName}</div>
                                                    <div className="tag-out">{user?.costPerMonth}</div>
                                                    <div className="tag-in">{user?.dueDate}</div>
                                                    <div className="tag-out">{user?.duration}</div>
                                                </div>
                                            </div>
                                            <IonButton hidden={user?.start} routerLink={routes.createSusu} fill="outline" size="small">Start a susu group</IonButton>
                                        </IonList>
                                    </IonList>
                                    <IonList>
                                        <IonItemDivider color="primary"><b>Groups am in</b></IonItemDivider>
                                        <IonList>
                                            {
                                                susuGroups.length?
                                                susuGroups.map((group, key)=>(
                                                    <IonList class="item-list-container pointer" key={key}>
                                                        <div style={{color:"dodgerblue"}}>
                                                            <b>{group?.susuName}</b>
                                                        </div>
                                                        <div>{group?.city}</div>
                                                        <div>{group?.address}</div>
                                                        <div>{group?.number}</div>
                                                        <div>{group?.email}</div>
                                                        <IonList class="mini-list-scroll">
                                                            <IonItemDivider color="medium">breakdown of transactions</IonItemDivider>
                                                            {
                                                                group?.deposit?.map((dep, key)=>(
                                                                    <IonList class="item-list-container" key={key}>
                                                                        <IonLabel style={{float:"left"}}>{tools.handleDate(dep?.date)}</IonLabel>
                                                                        <IonLabel style={{float:"right"}}>${dep?.amount}</IonLabel>
                                                                    </IonList>
                                                                ))
                                                            }
                                                        </IonList>
                                                        <IonItemDivider color="medium">Make Deposit</IonItemDivider>
                                                        <IonItem lines="full">
                                                            <IonButton fill="outline" onClick={()=>onOpenPaymentForm(group)} slot="start">Payment</IonButton>
                                                        </IonItem>
                                                    </IonList>
                                                )):
                                                <IonList class="item-list-container pointer">
                                                    <IonLabel>Not in any group</IonLabel>
                                                </IonList>
                                            }
                                        </IonList>
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