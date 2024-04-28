import { Inyago } from "../models/Inyago";
import { Vector } from "../models/Vector";
import { Arrow, FIELD_SIZE, SPAN } from "./Const";

export class GameManager {
    static createInyagos(): Inyago[] {
        const inyagos: Inyago[] = [];
        inyagos.push(Inyago.create({ x: Math.floor(FIELD_SIZE / 2), y: Math.floor(FIELD_SIZE / 2) }));
        return inyagos;
    }

    static moveInyagos(_inyagos: Inyago[]): Inyago[] {
        const inyagos = _inyagos.map(inyago => inyago.clone());
        inyagos.forEach(inyago => {
            inyago.move(SPAN);
        });
        return inyagos;
    }

    static nextInyagos(_inyagos: Inyago[], arrow: Arrow): Inyago[] {
        const inyagos = _inyagos.map(inyago => inyago.clone());
        const vector = GameManager.arrowToVector(arrow);
        let nextPoint = {
            x: inyagos[0].point.x + vector.x,
            y: inyagos[0].point.y + vector.y,
        };
        for (let i = 0; i < inyagos.length; i++) {
            const temp = inyagos[i].point;
            inyagos[i].point = nextPoint;
            nextPoint = temp;
        }

        return inyagos;
    }

    static arrowToVector(arrow: Arrow): Vector {
        switch (arrow) {
            case "ArrowUp":
                return { x: 0, y: -1 };
            case "ArrowDown":
                return { x: 0, y: 1 };
            case "ArrowLeft":
                return { x: -1, y: 0 };
            case "ArrowRight":
                return { x: 1, y: 0 };
            default:
                return { x: 0, y: 0 };
        }
    }
}