import { Arrow, FIELD_SIZE, SPAN } from "../etc/Const";
import { Inyago } from "./Inyago";
import { Point } from "./Point";
import { Vector } from "./Vector";

export class GameState {
    public Inyagos: Inyago[] = [];
    public Esa: Point | null = null;
    public Arrow: Arrow = "";
    public Progress: number = 1.0;

    public clone(): GameState {
        const newState = new GameState();
        newState.Inyagos = this.Inyagos.map((inyago) => inyago.clone());
        newState.Esa = this.Esa;
        newState.Arrow = this.Arrow;
        newState.Progress = this.Progress;
        return newState;
    }

    tick() {
        this.Inyagos.forEach(inyago => {
            inyago.move(SPAN);
        });
    }

    nextStep() {
        const vector = GameState.arrowToVector(this.Arrow);
        let nextPoint = GameState.nextPoint(this.Inyagos[0].point, vector);
        for (let i = 0; i < this.Inyagos.length; i++) {
            const temp = this.Inyagos[i].point;
            this.Inyagos[i].point = nextPoint;
            nextPoint = temp;
        }
    }

    private static nextPoint(point: Point, vector: Vector): Point {
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

    private static arrowToVector(arrow: Arrow): Vector {
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

    public static Init(): GameState {
        const newState = new GameState();
        newState.Inyagos = GameState.createInyagos();
        newState.Esa = GameState.randomEsa(newState.Inyagos);
        return newState;
    }

    private static createInyagos(): Inyago[] {
        const inyagos: Inyago[] = [];
        inyagos.push(Inyago.create({ x: Math.floor(FIELD_SIZE / 2), y: Math.floor(FIELD_SIZE / 2) }));
        return inyagos;
    }

    private static randomEsa(inyagos: Inyago[]): Point {
        const innnerPoints = GameState.innerPoint();
        const notBlankPoints = GameState.notBlankPoint(inyagos);
        const blankPoints = innnerPoints.filter(point => {
            return notBlankPoints.every(notBlankPoint => {
                return notBlankPoint.x !== point.x || notBlankPoint.y !== point.y;
            });
        });
        const index = Math.floor(Math.random() * blankPoints.length);
        return blankPoints[index];
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
}