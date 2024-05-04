import { Arrow, SPAN, State } from "../etc/Const";
import { Utils } from "../etc/Utils";
import { Esa } from "./Esa";
import { Inyago } from "./Inyago";
import { Point } from "./Point";

export class GameState {
    public Inyagos: Inyago[] = [];
    public Esas: Esa[] = [];
    public Arrow: Arrow = "";
    public PrevArrow: Arrow = "";
    public Progress: number = 0.0;
    public State: State = "start";
    public Holes: Point[] = [];
    public Level: number = 1;

    public static Init(): GameState {
        const newState = new GameState();
        newState.Inyagos = Utils.createInyagos();
        newState.Esas = Utils.randomEsas(newState.Inyagos, []);
        newState.State = "start";
        newState.Holes = [];
        return newState;
    }

    public Clone(): GameState {
        const newState = new GameState();
        newState.Inyagos = this.Inyagos.map((inyago) => inyago.Clone());
        newState.Esas = this.Esas;
        newState.Arrow = this.Arrow;
        newState.PrevArrow = this.PrevArrow;
        newState.Progress = this.Progress;
        newState.State = this.State;
        newState.Holes = this.Holes;
        newState.Level = this.Level;
        return newState;
    }

    public Tick(): GameState {
        const clone = this.Clone();
        clone.move();
        clone.Progress += SPAN;
        if (clone.Progress >= 1) {
            clone.nextStep();
            clone.Progress = 0;
        }
        if (clone.Progress === SPAN) {
            if (Utils.isGameOver(clone.Inyagos, clone.Holes)) {
                clone.State = "gameover";
            }
        }
        clone.PrevArrow = clone.Arrow;
        return clone;
    }

    public play(level: number): GameState {
        const clone = this.Clone();
        clone.State = "playing";
        clone.Level = level;
        return clone;
    }

    public showResult(): GameState {
        const clone = this.Clone();
        clone.State = "result";
        return clone;
    }

    public clear(): boolean {
        switch (this.Level) {
            case 1:
                return this.Inyagos.length >= 30;
            case 2:
                return this.Inyagos.length >= 50;
        }
        return false;
    }

    private move() {
        this.Inyagos.forEach(inyago => {
            inyago.Move(SPAN);
        });
    }

    private nextStep() {
        const vector = Utils.arrowToVector(this.Arrow);
        const hitEsa = Utils.hitEsa(this.Inyagos, this.Esas);
        let nextPoint = Utils.nextPoint(this.Inyagos[0].point, vector);
        for (let i = 0; i < this.Inyagos.length; i++) {
            const temp = this.Inyagos[i].point;
            this.Inyagos[i].SetPoint(nextPoint);
            nextPoint = temp;
        }
        if (hitEsa) {
            this.Inyagos.push(Inyago.create(nextPoint));
            if (hitEsa === "special") {
                this.Inyagos.push(Inyago.create(nextPoint));
                this.Inyagos.push(Inyago.create(nextPoint));
            }
            if (this.clear()) {
                this.State = "gameover";
                return;
            }
            this.Holes.push(nextPoint);
            if (this.Holes.length > 11) {
                this.Holes.shift();
            }
            this.Esas = Utils.randomEsas(this.Inyagos, this.Holes);
        }
    }
}