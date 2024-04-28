
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { GameManager } from "../etc/GameManager";
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
        const nextGameState = gameState.clone();
        if (nextGameState.Inyagos.length === 0) return;
        nextGameState.tick();
        nextGameState.Progress += SPAN;
        if (nextGameState.Progress >= 1) {
            nextGameState.nextStep();
            nextGameState.Progress = 0;
        }
        setGameState(nextGameState);
    }, [time]);

    useKey(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (e) => {
        if (gameState.Arrow !== e.key) {
            const nextGameState = gameState.clone();
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