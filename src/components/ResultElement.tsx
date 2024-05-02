import './ResultElement.css'
import { CELL_WIDTH, FIELD_SIZE } from "../etc/Const";
type Props = {
    score: number;
}
export default function ResultElement(props: Props) {
    return (
        <>
            <text
                className="result_text"
                x={CELL_WIDTH * (FIELD_SIZE / 2)}
                y={CELL_WIDTH * (FIELD_SIZE / 2)}
                textAnchor="middle"
                fontWeight={"bold"}
                fontSize="200"
                fontFamily="Impact"
                fill={"black"}
                opacity={0.5}
            >{(props.score.toString()).padStart(3, "0")}</text>
        </>
    )
}