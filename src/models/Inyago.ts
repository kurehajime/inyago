import { CELL_WIDTH } from "../etc/Const";
import { Point } from "./Point";
import { Position } from "./Position";
import { Vector } from "./Vector";

export class Inyago {
    static create(point: Point): Inyago {
        return new Inyago(point, { x: point.x * CELL_WIDTH, y: point.y * CELL_WIDTH });
    }

    constructor(public point: Point, public position: Position) {
    }

    public clone(): Inyago {
        const clone = new Inyago(this.point, this.position);
        return clone;
    }

    public move(rateprogress: number): Inyago {
        const to = this.to();
        const diffX = to.x - this.position.x;
        const diffY = to.y - this.position.y;
        const step = rateprogress * CELL_WIDTH;
        const clone = this.clone();
        if (Math.abs(diffX) < step) {
            clone.position.x = to.x;
        } else {
            clone.position.x += Math.sign(diffX) * step;
        }
        if (Math.abs(diffY) < step) {
            clone.position.y = to.y;
        } else {
            clone.position.y += Math.sign(diffY) * step;
        }
        return clone;
    }

    public vector(): Vector {
        return {
            x: Math.sign(this.to().x - this.position.x),
            y: Math.sign(this.to().y - this.position.y),
        };
    }

    public to(): Position {
        return {
            x: this.point.x * CELL_WIDTH,
            y: this.point.y * CELL_WIDTH,
        };
    }
}