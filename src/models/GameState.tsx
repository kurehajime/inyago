import { Arrow, SPAN } from "../etc/Const";
import { Utils } from "../etc/Utils";
import { Inyago } from "./Inyago";
import { Point } from "./Point";

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

    public tick(): GameState {
        const clone = this.clone();
        clone.move();
        clone.Progress += SPAN;
        if (clone.Progress >= 1) {
            clone.nextStep();
            clone.Progress = 0;
        }
        return clone;
    }

    public move() {
        this.Inyagos.forEach(inyago => {
            inyago.move(SPAN);
        });
    }

    public nextStep() {
        const vector = Utils.arrowToVector(this.Arrow);
        let nextPoint = Utils.nextPoint(this.Inyagos[0].point, vector);
        for (let i = 0; i < this.Inyagos.length; i++) {
            const temp = this.Inyagos[i].point;
            this.Inyagos[i].point = nextPoint;
            nextPoint = temp;
        }
    }

    public static Init(): GameState {
        const newState = new GameState();
        newState.Inyagos = Utils.createInyagos();
        newState.Esa = Utils.randomEsa(newState.Inyagos);
        return newState;
    }
}