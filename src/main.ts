/// <reference types="@workadventure/iframe-api-typings" />

import { UIWebsite, Popup } from "@workadventure/iframe-api-typings";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getAreaObject } from '@workadventure/scripting-api-extra';

console.log('Script started successfully');

let currentPopup: Popup | undefined;
let radioUIWebsite: UIWebsite;
let playerOwner: string | null = null;

interface Radio {
    playerOwner: string | null
    playerNumber: number
    radioName?: string
}

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    await WA.players.configureTracking({
        players: true,
        movement: false,
      });
    initRadioRoom();
}).catch(e => console.error(e));
    
    WA.ui.onRemotePlayerClicked.subscribe(async (remotePlayer) => {
        const radioTime = await WA.player.state.loadVariable('radioTime') as RadioTime;
        let actionTitle = "Cliquez pour voir plus";
    
        if (radioTime && Object.keys(radioTime).length > 0) {
            const mostListenedRadio = Object.entries(radioTime).reduce((a, b) => a[1] > b[1] ? a : b);
            const hours = Math.floor(mostListenedRadio[1] / 3600);
            const minutes = Math.floor((mostListenedRadio[1] % 3600) / 60);
            const seconds = mostListenedRadio[1] % 60;
    
            actionTitle = `${remotePlayer.name} a le plus écouté la radio ${mostListenedRadio[0]} pour ${hours}h ${minutes}min ${seconds}s.`;
        } else {
            actionTitle = `${remotePlayer.name} n'a pas encore écouté de radio.`;
        }
    
        remotePlayer.addAction(actionTitle, () => {});
    });

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    async function getAllRadioRoom(): Promise<any> {
        const rooms = await getAreaObject();
        var radioRooms = [];
        for (const room of rooms) {
            if (room.name.startsWith('radio') && !room.name.includes('Logo')) {
                radioRooms.push(room);
            }
        }
        return radioRooms;
    }
    


    async function initRadioRoom(){
        
        const radioRooms = await getAllRadioRoom();

        for(const room of radioRooms){

            console.log('Init radio room  : '+ room.name);

            WA.room.area.onEnter(room.name).subscribe( async () => {
                WA.event.broadcast("bell-rang", {});
        
                WA.player.state.saveVariable("radio_can_play", false);
        
                const radio: Radio = await WA.state.loadVariable(room.name) as Radio;
        
                if (radio === undefined || !radio.playerOwner || radio.playerNumber <= 0 ) {
                    const playerOwner = WA.player.id;
        
                    WA.state.saveVariable(room.name, {
                        playerOwner,
                        playerNumber: 1,
                        radioName: radio && radio.radioName ? radio.radioName : ''
                    });
                    console.log("Le propriétaire de la radio est  : "+  WA.player.name + " dans la room : " + room.name);
        
                    radioUIWebsite = await WA.ui.website.open({
                        url: "http://localhost:5173/radio.html?room="+room.name,
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
                    WA.state.saveVariable(room.name, { 
                        playerOwner: radio.playerOwner,
                        playerNumber: radio.playerNumber++,
                        radioName: radio.radioName ? radio.radioName : ''
                    });
                    if(radio.playerOwner === WA.player.id){
                        radioUIWebsite = await WA.ui.website.open({
                            url: "http://localhost:5173/radio.html?room="+room.name,
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


            WA.room.area.onLeave(room.name).subscribe(async () => {
                console.log('Player leaving the radio station ...');
        
                WA.player.state.saveVariable("radio_can_play", true);
        
                const radio: Radio = await WA.state.loadVariable(room.name) as Radio;
        
                if(radio.playerOwner === WA.player.id ){
                    WA.state.saveVariable(room.name, {
                        playerOwner,
                        playerNumber: radio.playerNumber -1,
                        radioName: radio.radioName ? radio.radioName : ''
                    });
                    console.log('La playerOwner reset à null : ' + room.name);
                }
                radioUIWebsite.close();
        
                // DONT INCREMENT RADIO TIME WHEN LEAVING RADIO
                WA.player.state.saveVariable('isPlaying', {isPlaying: false, name: '', url: ''});
                console.log('La playerOwner reset à null : ' + room.name);
                }
            );
            
        }
    }


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

    interface IsPlaying {
        isPlaying: boolean;
        name: string;
        url: string;
    }
    
    interface RadioTime {
        [key: string]: number;
    }
    
    function incrementRadio(){
        const isPlaying = WA.player.state.isPlaying as IsPlaying;

        if( isPlaying.isPlaying && isPlaying.name){
            let radioTime = WA.player.state.radioTime as RadioTime || {};
            radioTime[isPlaying.name] = (radioTime[isPlaying.name] || 0) + 1 ; 
            
            WA.player.state.saveVariable(
                "radioTime", 
                radioTime,
                {
                    public: true,
                    persist: true, 
                    ttl:  31536000,
                    scope: 'world'
                });
                
        }
        else{
            console.log("Player is not playing, radio time is not incremented");
        }
    }

    setInterval(incrementRadio, 1000);

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
    
    let noteRadioPlayer: any;

    WA.room.onEnterLayer("visibleNoteRadioPlayer").subscribe(async () => {
        console.log("Entering noteRadioPlayer layer");

        noteRadioPlayer = await WA.ui.website.open({
            url: "./note.html?type=player",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "40vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });

    });

    let noteRadioGlobal: any;

    WA.room.onEnterLayer("visibleNoteRadioGlobal").subscribe(async () => {
        console.log("Entering visibleNoteRadioGlobal layer");

        noteRadioGlobal = await WA.ui.website.open({
            url: "./note.html?type=global",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "40vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });

    });

    WA.room.onLeaveLayer("visibleNoteRadioGlobal").subscribe(() => {
        noteRadioGlobal.close();
    });

    WA.room.onLeaveLayer("visibleNoteRadioPlayer").subscribe(() => {
        noteRadioPlayer.close();
    });

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export { };
