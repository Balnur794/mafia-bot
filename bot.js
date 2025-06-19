(function () {
    console.log("[BOT] Запуск Мафия-бота");

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const socket = Object.values(window).find(w => w?.emit && w?.on);

    if (!socket) {
        console.warn("[BOT] WebSocket не найден.");
        return;
    }

    let playerIds = [];

    socket.on("data", async function (data) {
        for (const event of data) {
            if (event[0] === "gl") {
                const id = event[1][0];
                if (!playerIds.includes(id)) playerIds.push(id);
            }

            if (event[0] === "gs") {
                const phase = event[1];

                if (phase === 2) {
                    socket.emit("data", [["s", "r"]]);
                }

                if (phase === 3) {
                    const target = playerIds[Math.floor(Math.random() * playerIds.length)];
                    socket.emit("data", [["gk", target]]);
                }

                if (phase === 5) {
                    socket.emit("data", [["exit"]]);
                }
            }

            if (event[0] === "n_act") {
                const target = playerIds[Math.floor(Math.random() * playerIds.length)];
                socket.emit("data", [["nk", [target]]]);
            }
        }
    });

    console.log("[BOT] Готов к действиям");
})();
