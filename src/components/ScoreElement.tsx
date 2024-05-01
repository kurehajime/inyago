import { CELL_WIDTH, FIELD_SIZE } from "../etc/Const";
import revert from '../assets/revert.png'
import './ScoreElement.css'
type Props = {
    score: number;
}
export default function ScoreElement(props: Props) {
    return (
        <>
            <image
                className="inyago_icon"
                x={CELL_WIDTH * (FIELD_SIZE - 3.6)}
                y={CELL_WIDTH * 0}
                width={CELL_WIDTH}
                height={CELL_WIDTH}
                href={revert}
            />
            <text
                x={CELL_WIDTH * (FIELD_SIZE - 1)}
                y={CELL_WIDTH * 0.9}
                textAnchor="end"
                fontWeight={"bold"}
                fontSize="50"
                fontFamily="Impact"
                fill={"white"}
            >{(props.score.toString()).padStart(3, "0")}</text>
        </>
    )
}