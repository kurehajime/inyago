import { Arrow, CELL_WIDTH } from "../etc/Const";
import { Point } from "./Point";
import { Position } from "./Position";
import { Vector } from "./Vector";

export class Inyago {

    constructor(public point: Point, public position: Position, public vector: Vector, public prevPoint: Point) {
    }

    public static Create(point: Point): Inyago {
        return new Inyago(point, { x: point.x * CELL_WIDTH, y: point.y * CELL_WIDTH }, { x: 0, y: 0 }, point);
    }

    public Clone(): Inyago {
        const clone = new Inyago(this.point, this.position, this.vector, this.prevPoint);
        return clone;
    }

    public SetPoint(point: Point) {
        this.prevPoint = this.point;
        this.point = point;
    }

    public Move(rateprogress: number) {
        const to = this.To();
        const diffX = to.x - this.position.x;
        const diffY = to.y - this.position.y;
        const step = rateprogress * CELL_WIDTH;
        if (Math.abs(diffX) < step) {
            this.position.x = to.x;
        } else {
            this.position.x += Math.sign(diffX) * step;
        }
        if (Math.abs(diffY) < step) {
            this.position.y = to.y;
        } else {
            this.position.y += Math.sign(diffY) * step;
        }
        const vector = this.calcVector();
        if (vector.x !== 0 || vector.y !== 0) {
            this.vector = vector;
        }
    }

    CalcArrow(): Arrow {
        const vector = this.calcVector();
        if (vector.x === 1) {
            return "ArrowRight";
        }
        if (vector.x === -1) {
            return "ArrowLeft";
        }
        if (vector.y === 1) {
            return "ArrowDown";
        }
        if (vector.y === -1) {
            return "ArrowUp";
        }
        return ""
    }

    public From(): Position {
        return {
            x: this.prevPoint.x * CELL_WIDTH,
            y: this.prevPoint.y * CELL_WIDTH,
        };
    }

    public To(): Position {
        return {
            x: this.point.x * CELL_WIDTH,
            y: this.point.y * CELL_WIDTH,
        };
    }

    private calcVector(): Vector {
        return {
            x: Math.sign(this.To().x - this.From().x),
            y: Math.sign(this.To().y - this.From().y),
        };
    }
}