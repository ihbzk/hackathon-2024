/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    WA.room.area.onEnter('radio').subscribe(async () => {
        WA.event.broadcast("bell-rang", {});
        console.log(WA.player.state.radio);
    });

    WA.room.onEnterLayer('floor/floor2').subscribe(() => {
        WA.room.setProperty('floor/floor2', "playAudio", WA.player.state.radio);
        console.log("radio partout " + WA.player.state.radio);
        //area.setProperty('playAudio', WA.player.state.radio);
    });

    WA.player.state.onVariableChange('radio').subscribe( (newValue) => {
        console.log("radio player has changed to " + newValue);
        WA.room.setProperty('floor/floor2', "playAudio", newValue);
    });
    
    

    WA.ui.actionBar.addButton({
        id: 'radio-btn',
        type: 'action',
        imageSrc: 'http://localhost:5174/images/radio-solid.svg',
        toolTip: 'Radio',
        callback: (event) => {
            console.log('Button clicked', event);
            WA.nav.openCoWebSite('http://localhost:5174/radio.html', true);
        
            // When a user clicks on the action bar button 'Register', we remove it.
            //WA.ui.actionBar.removeButton('register-btn');
        }
    });
    const bellSound = WA.sound.loadSound("sounds/door-bell-1.mp3");

    // When the bell-rang event is received
    WA.event.on("bell-rang").subscribe(() => {
      // Play the sound of the bell
      bellSound.play({})
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
