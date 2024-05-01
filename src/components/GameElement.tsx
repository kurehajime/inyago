
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { useKey } from 'rooks';
import { Arrow, FIELD_WIDTH } from "../etc/Const";
import { GameState } from "../models/GameState";
import CoverElement from "./CoverElement";

export default function GameElement() {
    const [gameState, setGameState] = useState<GameState>(new GameState());
    const { time, start } = useTimer({
        interval: 17,
    });

    useEffect(() => {
        setGameState(GameState.Init());
        start();
    }, []);

    useEffect(() => {
        if (gameState.Inyagos.length === 0) return;
        if (gameState.State === "gameover") return;
        setGameState(gameState.Tick());
    }, [time]);

    useKey(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (e) => {
        if (gameState.Arrow !== e.key) {
            const nextGameState = gameState.Clone();
            if (gameState.Inyagos.length > 1) {
                if (
                    (nextGameState.Arrow === "ArrowDown" && e.key === "ArrowUp") ||
                    (nextGameState.Arrow === "ArrowUp" && e.key === "ArrowDown") ||
                    (nextGameState.Arrow === "ArrowLeft" && e.key === "ArrowRight") ||
                    (nextGameState.Arrow === "ArrowRight" && e.key === "ArrowLeft")
                ) {
                    // 明確に自滅するような逆走は無視
                    return;
                }
            }
            nextGameState.Arrow = e.key as Arrow;
            setGameState(nextGameState);
        }
    }, {
        eventTypes: ["keydown"],
    });
    useKey(["Enter", "Space"], () => {
        if (gameState.State === "gameover") {
            setGameState(GameState.Init());
            start();
        }
    });



    return (
        <svg
            width={FIELD_WIDTH}
            height={FIELD_WIDTH}
            className={gameState.State === "gameover" ? "gameover" : ""}
        >
            <FieldElement
                inyagos={gameState.Inyagos}
                esas={gameState.Esas}
                state={gameState.State}
                time={time}
                holes={gameState.Holes}
            />
            <CoverElement touch={function () {

            }}
                nextCommand={false}
            />
        </svg>
    )
}