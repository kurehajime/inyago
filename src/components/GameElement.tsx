/* eslint-disable react-hooks/exhaustive-deps */
import party from "party-js";
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { useKey } from 'rooks';
import { Arrow, ButtonType } from "../etc/Const";
import { GameState } from "../models/GameState";
import CoverElement from "./CoverElement";
import './GameElement.css'
import ResultElement from "./ResultElement";
import TitleElement from "./TitleElement";
import React from "react";

export default function GameElement() {
    const ref = React.useRef<SVGSVGElement>(null)
    const [gameState, setGameState] = useState<GameState>(new GameState());
    const [selectLevel, setSelectLevel] = useState<number>(1);
    const { time, start } = useTimer({
        interval: 17,
    });
    const turned = gameState.Arrow !== gameState.PrevArrow;

    const gameStart = () => {
        setGameState(GameState.Init());
        start();
    }

    const gamePlay = (level: number) => {
        setSelectLevel(level);
        setGameState(gameState.play(level));
    }

    useEffect(() => {
        setGameState(GameState.Init());
        start();
    }, [start]);

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
        if (gameState.State === "start") {
            if (e.key === "ArrowLeft") {
                setSelectLevel((3 + selectLevel - 1 - 1) % 3 + 1);
            }
            if (e.key === "ArrowRight") {
                setSelectLevel((3 + selectLevel - 1 + 1) % 3 + 1);
            }
            return;
        }
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
            gameStart();
        }
        if (gameState.State === "start") {
            gamePlay(selectLevel);
        }
    });

    let effect = "nomal";
    if (gameState.State === "gameover" || gameState.State === "result") {
        if (gameState.clear()) {
            effect = "clear";
        } else if (gameState.Level === 3 && gameState.Inyagos.length >= 30) {
            effect = "clear";
        } else {
            effect = "gameover";
        }
    }

    useEffect(() => {
        if (effect === "clear") {
            if (ref.current !== null) {
                const offset = ref.current.getBoundingClientRect();
                const rect = new party.Rect(offset.left, offset.top, offset.width, offset.height);
                party.confetti(rect, {
                    count: party.variation.range(20, 80),
                    size: party.variation.range(0.8, 1.2),
                });
            }
        }
    }, [effect]);

    return (
        <svg
            viewBox="0 0 750 750"
            className={effect}
            ref={ref}
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
                    clear={gameState.clear()}
                    level={gameState.Level}
                />
            }
            {
                gameState.State === "start" &&
                <TitleElement
                    selectLevel={selectLevel}
                />
            }
            <CoverElement
                touched={function (arrow: Arrow) {
                    const nextGameState = gameState.Clone();
                    nextGameState.Arrow = arrow;
                    setGameState(nextGameState);
                }}
                gameStart={function (buttonType: ButtonType) {
                    if (gameState.State === "result" && buttonType === "OK") {
                        gameStart();
                    }
                    if (gameState.State === "start") {
                        switch (buttonType) {
                            case "1":
                                gamePlay(1)
                                break;
                            case "2":
                                gamePlay(2)
                                break;
                            case "3":
                                gamePlay(3)
                                break;
                            default:
                                break;
                        }
                    }
                }}
                turned={turned}
                arrow={gameState.Arrow}
                state={gameState.State}
                hover={(buttonType: ButtonType) => {
                    if (buttonType === "1") {
                        setSelectLevel(1)
                    }
                    if (buttonType === "2") {
                        setSelectLevel(2)
                    }
                    if (buttonType === "3") {
                        setSelectLevel(3)
                    }
                }}
            />
        </svg>
    )
}