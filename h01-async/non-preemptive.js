function sumUp(max) {
    let sum = 0;

    for (let i = 1; i < max; i++) {
        sum = sum + i;
    }

    return sum;
}

function main() {
    let startTime = Date.now();

    setTimeout(() => {
        console.log("Timer ran after " + (Date.now() - startTime) + "ms");
    }, 1000);

    let result = sumUp(10000000000);

    let endTime = Date.now();

    let duration = endTime - startTime;

    console.log('Result: ' + result);
    console.log('Duration: ' + duration / 1000 + 's');
}

/* 
Interpretation:

Die funktion sumUp blockiert den Thread (auf meinem Rechner) für etwa 13.5 Sekunden.
Erst wenn der Thread frei wird, d.h. die main-Funktion beendet ist, kann der Timer ausgeführt werden.
Daher wird der Timer erst nach etwa 13.5 Sekunden ausgeführt, anstatt der "erwarteten" 1 Sekunde.
*/

main();