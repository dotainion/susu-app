import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { addOutline, constructOutline, settingsOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Header } from '../components/Header';




const questons = [
        {
            FAQ: "What is Susu-App?",
            answer: `Susu-App is a mobile and web application designed to help individuals achieve their financial savings goals and build credit. Users connect through community based money pools and rotate their funds to save capital faster.  The platform simulates the traditional form of a rotational savings club. 

            Rotational savings clubs are also known as tandas (Latin America),  cundinas (Mexico), susu (West Africa and the Caribbean), partnerhand (Carribean/UK), hui (Asia), Game'ya (Middle East), kye (South Korea), tanomosiko (Japan), pandeiros (Brazil), arisan (Indonesia) and chitfund (India).`,
            list: []
        },{
            FAQ: "How can Susu-App help me?",
            answer: `By rotating your funds with the help of others, you have the ability to access capital faster. Studies show that people who save in a group are three times more likely to successfully reach their savings goals. Also, a susu can serve as an alternative for loans. Which in turn allows our users to avoid high APR rates. `,
            list: []
        },{
            FAQ: "What does the word susu mean?",
            answer: `A susu is a type of informal savings club arrangement between a small group of people who take turns by lending and re-paying funds. `,
            list: []
        },{
            FAQ: "How do I join a group?",
            answer: `To join a group, simply navigate to the "Join Susu Page", enter search and select a group of your choice. You also have the option to create your own group from the "Create Susu" page. `,
            list: []
        },{
            FAQ: "How large are groups?",
            answer: `Group size can a range any amount of people. `,
            list: []
        },{
            FAQ: "What happens if someone leaves the group mid-cycle?",
            answer: `Susu-App will issue a warning to individuals who fail to commit to their payment plan. We process an auto-payment from the individuals linked bank account. If the payment fails on our first attempt, the individual will be blocked from joining other groups until the collection is paid. We report missing payments to collection agencies and in some cases to credit bureaus.`,
            list: []
        },{
            FAQ: "What if there are not enough people by the start date of the susu?",
            answer: `The start date of the group will simply adjust to a new date until the minimum amount of individuals confirm their spot in the group. `,
            list: []
        },{
            FAQ: "What happens if I leave after the group starts?",
            answer: `Unfortunately, we cannot accommodate your request without penalties involved. Missing payments reported can negatively impacting your rating score and result in prevention of the use of our services in the future. 
            .`,
            list: []
        },{
            FAQ: "How many cycles are in a group?",
            answer: `The number of cycles correlates to the number of individuals in each group and payment frequency.

            For example, a group of 6 individuals who plan to save on a monthly basis, will each make 6 payments of the expected amount. This is a total of 6 payment cycles. 
            In some cases it will depends upon the group admin.`,
            list: []
        },{
            FAQ: "How is my scheduled collection date determined?",
            answer: `Your collection date is determined by when a group is created by the admin.`,
            list: []
        },{
            FAQ: "Is there a limit to group size?",
            answer: `No. The group size determin by how many members a admin allows`,
            list: []
        },{
            FAQ: "Can the payout order of the group be changed?",
            answer: `It depends on the admin and the agrement of the other members. `,
            list: []
        },{
            FAQ: "What happens after all cycles are complete?",
            answer: `When all payment cycles are complete and everyone has received their collection the susu will end. You have the option to recreate the group with the same members or a find a new one!`,
            list: []
        },{
            FAQ: "What is the responsibility of the group leader?",
            answer: `The group leader can set the group size, payment frequency and amount. They also have the ability to invite members to the group.`,
            list: []
        },{
            FAQ: "Is there a limit to the amount each group can save?",
            answer: `The amount an individual can save is dependent upon the admin and the agrement amoung the members. `,
            list: []
        },{
            FAQ: "How do I make and receive payments?",
            answer: `Making payment directly via this app is not yet available. you can pay admin in person and admin will update you account. payment will be refected on your account when complete.`,
            list: []
        },{
            FAQ: "When do I receive payment from the group?",
            answer: `Payments are received from each member of the group on your scheduled collection date. You can find your scheduled payment date on your group dashboard. `,
            list: []
        },{
            FAQ: "When are payments collected?",
            answer: `Funds are collected from each member on the date of their scheduled payment.`,
            list: []
        },{
            FAQ: "What happens if a member leaves the group and stops making payments?",
            answer: `If a member of the group leaves mid-cycle, they will be held responsible for all payments due. They will not be able to join other groups until the debt is paid. Missing payments may be reported to a collections agency or credit bureau. 

            We take the initiative to ensure that our members feel confident saving with us, so we step in to pay off any missing payments. This way the group can continue until completion of all cycles. `,
            list: []
        },{
            FAQ: "What happens if my payments is late?",
            answer: `We send notifications prior to any transaction. Reminders are used to ensure that members are aware  of any upcoming payments. In the event that a payment is late, you are still responsible for paying back the group. `,
            list: []
        },{
            FAQ: "Is my data secure?",
            answer: `Susu-App uses industry standards to encrypt and protect your information. Information about a users bank account is not stored with our services.`,
            list: []
        },{
            FAQ: "What personal information is required to join?",
            answer: `Contact information, id card number and address. `,
            list: []
        },{
            FAQ: "Can members see my financial information?",
            answer: `Other members can only view your upcoming payments. They do not have access to other members private financial information. Only the admin can view `,
            list: []
        }
    ];

const helps = [
    {
        question: "questions",
        answer: "my answers",
        list: []
    }
];


export const Help = () =>{
    const [tab, setTab] = useState(false);
    
    const toggleFAQs = (ansId) =>{
        let element = document.getElementById(ansId);
        if (element?.hidden) element.hidden = false;
        else element.hidden = true;
    }

    const tabToggle = () =>{
        if (tab) setTab(false);
        else setTab(true);
    }

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
                                        <IonLabel>Help & FAQ's</IonLabel>
                                    </IonItem>
                                    <IonList class="sub-header">
                                        <IonLabel>Fine what you need to know</IonLabel>
                                    </IonList>
                                    <div className="tab-bar">
                                        <label onClick={tabToggle} style={{backgroundColor: !tab && "white", color: !tab && "rgb(27, 87, 177)"}} className="pointer">FAQ's</label>
                                        <label onClick={tabToggle} style={{backgroundColor: tab && "white", color: tab && "rgb(27, 87, 177)"}} className="pointer">Help</label>
                                    </div>
                                    {/* this is for FAQ's*/}
                                    <IonList hidden={tab}>
                                        {
                                            questons.map((faq, key)=>(
                                                <div className="question-and-answers" key={key}>
                                                    <div onClick={()=>toggleFAQs(`${faq.FAQ}-/-expan`)}><IonIcon icon={addOutline}/>{faq.FAQ}</div>
                                                    <span hidden id={`${faq.FAQ}-/-expan`}>
                                                        <p>{faq.answer}</p>
                                                        <ul>
                                                            {faq.list.map((list, key)=>(
                                                                <li key={key}>{list}</li>
                                                            ))}
                                                        </ul>
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </IonList>
                                    {/* this is for help*/}
                                    <IonList hidden={!tab}>
                                        {
                                            helps.map((howTo, key)=>(
                                                <div className="question-and-answers" key={key}>
                                                    <div style={{color:"dodgerblue",backgroundColor:"white"}}>{howTo.question}</div>
                                                    <p style={{color:"dodgerblue",backgroundColor:"white"}}>{howTo.answer}</p>
                                                    <ul>
                                                        {howTo.list.map((ans, key)=>(
                                                            <li key={key}>{ans}</li>
                                                        ))}
                                                    </ul>
                                                </div>
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