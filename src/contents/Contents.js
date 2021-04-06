import { cardOutline, constructOutline, helpOutline, informationOutline, peopleOutline, personOutline, settingsOutline, shareSocialOutline, stopwatchOutline } from 'ionicons/icons';
import { routes } from '../global/Routes';

export const content = {
    pages: [
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
            url: onShare => onShare?.()
        },{
            title: "Money Transfer",
            icon: cardOutline,
            iconColor: "",
            url: routes.moneyTransfer
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
    ],
}