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

    WA.room.area.onLeave('radio').subscribe(async () => {

        await WA.players.configureTracking({
            players: true,
            movement: false,
          });

        const players = Array.from(WA.players.list());

        const radio = await WA.state.loadVariable('radio');

        if(radio.radioOwnerUserId && players.length > 0){
            const radioOwnerUserId = players[0].uuid;
            WA.state.saveVariable('radio', { radioOwnerUserId});
            console.log("Le nouveau propriétaire de la radio  :", radioOwnerUserId);
        }
        //TODO: Vérifier s'il y a aucun player dans la room ppur mettre la variable radioOwnerUserId à null

    });
    
    WA.room.area.onEnter('radio').subscribe(async () => {
        WA.event.broadcast("bell-rang", {});

        let radio = await WA.state.loadVariable('radio');
        
        if (!radio.radioOwnerUserId) {
            const radioOwnerUserId = WA.player.id;
            WA.state.saveVariable('radio', { radioOwnerUserId });
            console.log("Le nouveau propriétaire de la radio  :", radioOwnerUserId);

        } else {
            console.log("Il y a déjà un propriétaire pour la radio :", radio.radioOwnerUserId);
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

export { };

