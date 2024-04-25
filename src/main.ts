/// <reference types="@workadventure/iframe-api-typings" />

import { UIWebsite, Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: Popup | undefined;
let radioUIWebsite: UIWebsite;

interface Radio {
    playerOwner: string
    playerNumber: number
}

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
    
    WA.room.area.onEnter('radio').subscribe( async () => {
        WA.event.broadcast("bell-rang", {});

        WA.player.state.saveVariable("radio_can_play", false);

        const radio: Radio = await WA.state.loadVariable('radio') as Radio;

        if (!radio.playerOwner) {
            const playerOwner = WA.player.id;

            WA.state.saveVariable('radio', {
                playerOwner,
                playerNumber: 1
            });
            console.log("Le propriétaire de la radio est  :",  WA.player.name);

            radioUIWebsite = await WA.ui.website.open({
                url: "http://localhost:5173/radio.html",
                allowApi: true,
                position: {
                    vertical: "top",
                    horizontal: "right",
                },
                size: {
                    height: "35vh",
                    width: "35vw",
                },
                margin: {
                    top: "5vh",
                    right: "5vw",
                },
            });
        
        } else {
            WA.state.saveVariable('radio', { 
                playerOwner: radio.playerOwner,
                playerNumber: radio.playerNumber++
            });
        }
    });

    WA.room.area.onLeave('radio').subscribe(async () => {
        console.log('Player leaving the radio station ...');

        WA.player.state.saveVariable("radio_can_play", true);

        const radio: Radio = await WA.state.loadVariable('radio') as Radio;

        if(radio.playerOwner === WA.player.id || radio.playerNumber > 0){
            WA.state.saveVariable('radio', { 
                playerOwner : null,
                playerNumber: radio.playerNumber --
            });
            console.log('La playerOwner reset à null');
        }
        radioUIWebsite.close();
    });


    WA.room.website.create(
        {
            name: 'radioEveryWhere',
            url: 'http://localhost:5173/radioEveryWhereController.html',
            position: { x: 0, y: 0, width: 1, height: 1 },
            visible: false,
            allowApi: true,
            origin: 'map',
            scale: 1
        }
    );

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

export { };
