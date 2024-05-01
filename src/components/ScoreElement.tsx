import { CELL_WIDTH, FIELD_SIZE } from "../etc/Const";

type Props = {
    score: number;
}
export default function ScoreElement(props: Props) {
    return (
        <text
            x={CELL_WIDTH * (FIELD_SIZE - 1)}
            y={CELL_WIDTH * 0.9}
            textAnchor="end"
            fontWeight={"bold"}
            fontSize="50"
            fontFamily="Impact"
            fill={"white"}
        >{props.score}</text>
    )
}