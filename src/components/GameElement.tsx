
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { useKey } from 'rooks';
import { Arrow, SPAN } from "../etc/Const";
import { GameState } from "../models/GameState";

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
        setGameState(gameState.Tick());
    }, [time]);

    useKey(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (e) => {
        if (gameState.Arrow !== e.key) {
            const nextGameState = gameState.Clone();
            nextGameState.Arrow = e.key as Arrow;
            setGameState(nextGameState);
        }
    }, {
        eventTypes: ["keydown"],
    });

    return (
        <FieldElement
            inyagos={gameState.Inyagos}
            esa={gameState.Esa}
        />
    )
}