/// <reference types="@workadventure/iframe-api-typings" />

import { UIWebsite, Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: Popup | undefined;
let radioUIWebsite: UIWebsite;
let playerOwner: string | null = null;

interface Radio {
    playerOwner: string | null
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

        if (!radio.playerOwner || radio.playerNumber <= 0 ) {
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
            if(radio.playerOwner === WA.player.id){
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
            }
        }
    });

    WA.room.area.onLeave('radio').subscribe(async () => {
        console.log('Player leaving the radio station ...');

        WA.player.state.saveVariable("radio_can_play", true);

        const radio: Radio = await WA.state.loadVariable('radio') as Radio;

        if(radio.playerOwner === WA.player.id ){
            WA.state.saveVariable('radio', {
                playerOwner,
                playerNumber: radio.playerNumber -1
            });
            console.log('La playerOwner reset à null');
        }
        radioUIWebsite.close();

        // DONT INCREMENT RADIO TIME WHEN LEAVING RADIO
        WA.player.state.saveVariable('isPlaying', {isPlaying: false, name: '', url: ''});
        console.log('La playerOwner reset à null');
        }
    );


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

    function incrementRadio(){

        // RESET WA.player.state.saveVariable("radioTime", {});
        const isPlaying = WA.player.state.isPlaying;

        console.log("Incrementing radio time", isPlaying);

        if( isPlaying.isPlaying && isPlaying.name){
            var radioTime = WA.player.state.radioTime || {};
            console.log("radioTime", radioTime)
            radioTime[isPlaying.name] = radioTime[isPlaying.name] + 1 || 1;

            WA.player.state.saveVariable("radioTime", radioTime);
            console.log("Radio time is now", radioTime);
        }
        else{
            console.log("Player is not playing, radio time is not incremented");
        }
    }

    setInterval(incrementRadio, 10000);

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
