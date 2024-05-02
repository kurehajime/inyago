export const CELL_WIDTH = 50;
export const FIELD_SIZE = 15;
export const FIELD_WIDTH = FIELD_SIZE * CELL_WIDTH;
export const SPAN = 0.1;
export type Arrow = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "";
export type State = "start" | "playing" | "gameover" | "result";
export type EsaType = "normal" | "special";