
import { useTimer } from "use-timer";
import FieldElement from "./FieldElement";
import { useEffect, useState } from "react";
import { GameManager } from "../etc/GameManager";
import { Inyago } from "../models/Inyago";
import { useKey } from 'rooks';
import { Arrow, SPAN } from "../etc/Const";
import { Point } from "../models/Point";

export default function GameElement() {
    const [inyagos, setInyagos] = useState<Inyago[]>([]);
    const [arrow, setArrow] = useState<Arrow>("");
    const [progress, setProgress] = useState(1.0);
    const [esa, setEsa] = useState<Point | null>(null);
    const { time, start } = useTimer({
        interval: 17,
    });

    useEffect(() => {
        const _inagos = GameManager.createInyagos();
        setInyagos(_inagos);
        setEsa(GameManager.randomEsa(_inagos));
        start();
    }, []);

    useEffect(() => {
        let nextInyagos = inyagos;
        if (inyagos.length === 0) return;
        nextInyagos = GameManager.moveInyagos(nextInyagos);
        if (progress + SPAN >= 1) {
            setProgress(0);
            nextInyagos = GameManager.nextInyagos(nextInyagos, arrow);
        } else {
            setProgress(progress + SPAN);
        }
        setInyagos(nextInyagos);
    }, [time]);

    useKey(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (e) => {
        setArrow(e.key as Arrow);
    }, {
        eventTypes: ["keydown"],
    });

    return (
        <FieldElement
            inyagos={inyagos}
            esa={esa}
        />
    )
}