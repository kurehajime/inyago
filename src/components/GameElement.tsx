
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { useKey } from 'rooks';
import { Arrow } from "../etc/Const";
import { GameState } from "../models/GameState";
import CoverElement from "./CoverElement";
import './GameElement.css'
import ResultElement from "./ResultElement";

export default function GameElement() {
    const [gameState, setGameState] = useState<GameState>(new GameState());
    const { time, start } = useTimer({
        interval: 17,
    });
    const turned = gameState.Arrow !== gameState.PrevArrow;

    useEffect(() => {
        setGameState(GameState.Init());
        start();
    }, []);

    useEffect(() => {
        if (gameState.State === "gameover") {
            setTimeout(() => {
                setGameState(gameState.showResult());
            }, 700);
        }
    }, [gameState.State]);

    useEffect(() => {
        if (gameState.Inyagos.length === 0) return;
        if (gameState.State === "gameover") return;
        if (gameState.State === "playing") {
            setGameState(gameState.Tick());
        }
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
        e.preventDefault();
    }, {
        eventTypes: ["keydown"],
    });
    useKey(["Enter", "Space"], () => {
        if (gameState.State === "result") {
            setGameState(GameState.Init());
            start();
        }
    });



    return (
        <svg
            viewBox="0 0 750 750"
            className={gameState.State}
        >
            <FieldElement
                inyagos={gameState.Inyagos}
                esas={gameState.Esas}
                state={gameState.State}
                time={time}
                holes={gameState.Holes}
            />
            {
                gameState.State === "result" &&
                <ResultElement
                    score={gameState.Inyagos.length}
                />
            }
            <CoverElement
                touched={function (arrow: Arrow) {
                    const nextGameState = gameState.Clone();
                    nextGameState.Arrow = arrow;
                    setGameState(nextGameState);
                }}
                gameStart={function () {
                    if (gameState.State === "result") {
                        setGameState(GameState.Init());
                        start();
                    }
                }}
                turned={turned}
                arrow={gameState.Arrow}
                state={gameState.State}
            />
        </svg>
    )
}