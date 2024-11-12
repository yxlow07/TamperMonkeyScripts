// ==UserScript==
// @name         Life Sincerity Mist Maze Solver
// @namespace    http://tampermonkey.net/
// @version      2024-09-14
// @description  Mist maze solver!
// @author       Yu Xuan
// @match        https://lifesincerity.com/mistmaze/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const attributes = {
        "flower1.png": {
            "type": "flower",
            "color": false,
            "ring": false,
        },
        "flower2.png": {
            "type": "flower",
            "color": true,
            "ring": false,
        },
        "flower3.png": {
            "type": "flower",
            "color": false,
            "ring": true,
        },
        "flower4.png": {
            "type": "flower",
            "color": true,
            "ring": true,
        },
        "leaf1.png": {
            "type": "leaf",
            "color": false,
            "ring": false,
        },
        "leaf2.png": {
            "type": "leaf",
            "color": true,
            "ring": false,
        },
        "leaf3.png": {
            "type": "leaf",
            "color": false,
            "ring": true,
        },
        "leaf4.png": {
            "type": "leaf",
            "color": true,
            "ring": true,
        },
    }

    function pressAnswer1() {
        // Create the keypress event for the '1' key
        const event = new KeyboardEvent('keydown', {
            key: 1,
            keyCode: 48,
            code: `Digit1`,
            which: 48,
            bubbles: true
        });
        // Dispatch the event on the body
        document.body.dispatchEvent(event);
    }

    function pressAnswer2() {
        // Create the keypress event for the '2' key
        const event = new KeyboardEvent('keydown', {
            key: 2,
            keyCode: 49,
            code: `Digit2`,
            which: 49,
            bubbles: true
        });
        // Dispatch the event on the body
        document.body.dispatchEvent(event);
    }

    function pressAnswer3() {
        // Create the keypress event for the '3' key
        const event = new KeyboardEvent('keydown', {
            key: 3,
            keyCode: 50,
            code: `Digit3`,
            which: 50,
            bubbles: true
        });
        // Dispatch the event on the body
        document.body.dispatchEvent(event);
    }

    function pressAnswer4() {
        // Create the keypress event for the '4' key
        const event = new KeyboardEvent('keydown', {
            key: 4,
            keyCode: 51,
            code: `Digit4`,
            which: 51,
            bubbles: true
        });
        // Dispatch the event on the body
        document.body.dispatchEvent(event);
    }

    function findAnswer() {
        let elements = document.getElementsByClassName('imgmove');

        let noRingCount = 0, noColorCount = 0, ringCount = 0, colorCount = 0, flowerCount = 0, leafCount = 0;
        let answer;

        // Loop through to find the odd element out
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let src = element.getAttribute('src');
            let type = attributes[src].type;
            let color = attributes[src].color;
            let ring = attributes[src].ring;

            if (ring) {
                ringCount++;
            } else {
                noRingCount++;
            }

            if (color) {
                colorCount++;
            } else {
                noColorCount++;
            }

            if (type == 'flower') {
                flowerCount++;
            } else if (type == 'leaf') {
                leafCount++;
            }
        }

        if (noRingCount == 1) {
            answer = {'ring': false};
        } else if (noColorCount == 1) {
            answer = {'color': false};
        } else if (ringCount == 1) {
            answer = {'ring': true};
        } else if (colorCount == 1) {
            answer = {'color': true};
        } else if (flowerCount == 1) {
            answer = {'type': 'flower'};
        } else if (leafCount == 1) {
            answer = {'type': 'leaf'};
        } else {
            console.log("What!!");
            return;
        }

        // Loop through again to find the correct key
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let src = element.getAttribute('src');
            let type = attributes[src].type;
            let color = attributes[src].color;
            let ring = attributes[src].ring;

            if (type == answer.type || color == answer.color || ring == answer.ring) {
                // if (i == 0) pressAnswer1();
                // else if (i == 1) pressAnswer2();
                // else if (i == 2) pressAnswer3();
                // else pressAnswer4();
                document.getElementsByClassName('howtoplay')[0].innerHTML = i+1;
                document.getElementById(`b${i+1}`).style.border = "thick solid #FFFFFF";
                console.log(i+1);
                break;
            }
        }
    }

    // In a random time interval between 0.5 and 0.9 seconds, find the answer
    setInterval(findAnswer);

})();