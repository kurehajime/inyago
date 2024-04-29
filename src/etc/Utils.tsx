import { Inyago } from "../models/Inyago";
import { Point } from "../models/Point";
import { Vector } from "../models/Vector";
import { Arrow, FIELD_SIZE } from "./Const";

export class Utils {

    public static isGameOver(inyagos: Inyago[]): boolean {
        return Utils.outOfField(inyagos) || Utils.hitBody(inyagos);
    }

    public static createInyagos(): Inyago[] {
        const inyagos: Inyago[] = [];
        inyagos.push(Inyago.create({ x: Math.floor(FIELD_SIZE / 2), y: Math.floor(FIELD_SIZE / 2) }));
        return inyagos;
    }

    public static nextPoint(point: Point, vector: Vector): Point {
        let x = point.x + vector.x;
        let y = point.y + vector.y;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x >= FIELD_SIZE) x = FIELD_SIZE - 1;
        if (y >= FIELD_SIZE) y = FIELD_SIZE - 1;
        return {
            x: x,
            y: y,
        }
    }

    public static arrowToVector(arrow: Arrow): Vector {
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

    public static randomEsa(inyagos: Inyago[]): Point {
        const innnerPoints = Utils.innerPoint();
        const notBlankPoints = Utils.notBlankPoint(inyagos);
        const blankPoints = innnerPoints.filter(point => {
            return notBlankPoints.every(notBlankPoint => {
                return notBlankPoint.x !== point.x || notBlankPoint.y !== point.y;
            });
        });
        const index = Math.floor(Math.random() * blankPoints.length);
        return blankPoints[index];
    }

    public static hitEsa(inyagos: Inyago[], esa: Point | null): boolean {
        if (esa === null) return false;
        return inyagos.some(inyago => inyago.point.x === esa.x && inyago.point.y === esa.y);
    }

    private static innerPoint(): Point[] {
        const points: Point[] = [];
        for (let x = 1; x < FIELD_SIZE - 1; x++) {
            for (let y = 1; y < FIELD_SIZE - 1; y++) {
                points.push({ x: x, y: y });
            }
        }
        return points;
    }

    private static notBlankPoint(inyagos: Inyago[]): Point[] {
        return inyagos.map(inyago => inyago.point);
    }

    private static outOfField(inyagos: Inyago[]): boolean {
        const head = inyagos[0].point;
        return head.x < 1 || head.y < 1 || head.x >= FIELD_SIZE - 1 || head.y >= FIELD_SIZE - 1;
    }

    private static hitBody(inyagos: Inyago[]): boolean {
        const head = inyagos[0].point;
        return inyagos.slice(1).some(inyago => inyago.point.x === head.x && inyago.point.y === head.y);
    }
}