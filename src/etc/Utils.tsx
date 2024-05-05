import { Esa } from "../models/Esa";
import { Inyago } from "../models/Inyago";
import { Point } from "../models/Point";
import { Vector } from "../models/Vector";
import { Arrow, ButtonType, CELL_WIDTH, EsaType, FIELD_SIZE, State } from "./Const";

export class Utils {
    public static isGameOver(inyagos: Inyago[], holes: Point[]): boolean {
        if (inyagos.length === 0) return false;
        const head = inyagos[0].point;
        return Utils.outOfField(inyagos) || Utils.hitBody(inyagos) || holes.some(hole => hole.x === head.x && hole.y === head.y);
    }

    public static createInyagos(): Inyago[] {
        const inyagos: Inyago[] = [];
        inyagos.push(Inyago.Create({ x: Math.floor(FIELD_SIZE / 2), y: Math.floor(FIELD_SIZE / 2) }));
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

    public static randomEsas(inyagos: Inyago[], holes: Point[]): Esa[] {
        const esas: Esa[] = [];
        for (let i = 0; i < 2; i++) {
            esas.push(Utils.randomEsa(inyagos, holes, esas));
        }
        return esas;
    }

    public static randomEsa(inyagos: Inyago[], holes: Point[], esas: Esa[]): Esa {
        const innnerPoints = Utils.innerPoint();
        const notBlankPoints = inyagos.map(inyago => inyago.point);
        notBlankPoints.push(...holes);
        notBlankPoints.push(...esas.map(esa => esa.point));
        const blankPoints = innnerPoints.filter(point => {
            return notBlankPoints.every(notBlankPoint => {
                return notBlankPoint.x !== point.x || notBlankPoint.y !== point.y;
            });
        });
        const index = Math.floor(Math.random() * blankPoints.length);
        return {
            point: blankPoints[index],
            esaType: Utils.isSpecialEsa(blankPoints[index], holes) ? "special" : "normal"
        };
    }

    public static hitEsa(inyagos: Inyago[], esas: Esa[]): EsaType | null {
        const head = inyagos[0].point;
        for (let i = 0; i < esas.length; i++) {
            if (head.x === esas[i].point.x && head.y === esas[i].point.y) {
                return esas[i].esaType;
            }
        }
        return null;
    }

    public static hitTest(x: number, y: number, state: State): ButtonType {
        const buttonWidth = CELL_WIDTH * 3
        const buttonHeight = CELL_WIDTH * 3
        const buttonY = CELL_WIDTH * 9
        const buttonX1 = CELL_WIDTH * 2
        const buttonX2 = CELL_WIDTH * 6
        const buttonX3 = CELL_WIDTH * 10

        const okX = CELL_WIDTH * 4
        const okY = CELL_WIDTH * 10
        const okWidth = CELL_WIDTH * 7
        const okHeight = CELL_WIDTH * 2

        if (state === "start") {
            if (buttonY <= y && y <= buttonY + buttonHeight) {
                if (buttonX1 <= x && x <= buttonX1 + buttonWidth) {
                    return "1"
                }
                if (buttonX2 <= x && x <= buttonX2 + buttonWidth) {
                    return "2"
                }
                if (buttonX3 <= x && x <= buttonX3 + buttonWidth) {
                    return "3"
                }
            }
        }
        if (state === "result") {
            if (okY <= y && y <= okY + okHeight) {
                if (okX <= x && x <= okX + okWidth) {
                    return "OK"
                }
            }
        }

        return "Other"
    }

    private static isSpecialEsa(esaPoint: Point, holes: Point[]): boolean {
        return holes.some(hole => Utils.near(esaPoint, hole));
    }

    private static near(point1: Point, point2: Point): boolean {
        return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y) <= 1;
    }

    private static innerPoint(): Point[] {
        const points: Point[] = [];
        for (let x = 2; x < FIELD_SIZE - 2; x++) {
            for (let y = 2; y < FIELD_SIZE - 2; y++) {
                points.push({ x: x, y: y });
            }
        }
        return points;
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