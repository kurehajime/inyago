import './ResultElement.css'
import { CELL_WIDTH, FIELD_SIZE } from "../etc/Const";
type Props = {
    score: number;
    clear: boolean;
    level: number;
}
export default function ResultElement(props: Props) {
    let message = "GAME OVER"
    let color = "black"
    if (props.clear) {
        message = "CLEAR!"
        color = "url(#rainbow)"
    }
    if (props.level === 3) {
        if (props.score >= 100) {
            message = "AWESOME!"
            color = "url(#rainbow)"
        } else if (props.score >= 75) {
            message = "EXCELLENT!"
            color = "url(#rainbow)"
        } else if (props.score >= 50) {
            message = "GREAT!"
            color = "url(#rainbow)"
        } else if (props.score >= 30) {
            message = "NICE!"
            color = "url(#rainbow)"
        }
    }


    return (
        <>
            <defs>
                <linearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse" >
                    <stop stop-color="#e60000" offset="0%" />
                    <stop stop-color="#f39800" offset="20%" />
                    <stop stop-color="#fff100" offset="40%" />
                    <stop stop-color="#009944" offset="60%" />
                    <stop stop-color="#0068b7" offset="80%" />
                    <stop stop-color="#920783" offset="100%" />
                </linearGradient>
            </defs>
            <text
                className="result_text"
                x={CELL_WIDTH * (FIELD_SIZE / 2)}
                y={CELL_WIDTH * 5}
                textAnchor="middle"
                fontWeight={"bold"}
                fontSize="100"
                fontFamily="Impact"
                fill={color}
                opacity={0.8}
            >{message}</text>
            <text
                className="result_text"
                x={CELL_WIDTH * (FIELD_SIZE / 2)}
                y={CELL_WIDTH * 9}
                textAnchor="middle"
                fontWeight={"bold"}
                fontSize="200"
                fontFamily="Impact"
                fill={color}
                opacity={0.8}
            >{(props.score.toString()).padStart(3, "0")}</text>

            <rect
                x={CELL_WIDTH * 4}
                y={CELL_WIDTH * 10}
                width={CELL_WIDTH * 7}
                height={CELL_WIDTH * 2}
                fill={"white"}
                stroke={color}
                strokeWidth={5}
                opacity={0.9}
            ></rect>
            <text
                x={CELL_WIDTH * (FIELD_SIZE / 2)}
                y={CELL_WIDTH * 12 - 20}
                textAnchor="middle"
                fontWeight={"bold"}
                fontSize="80"
                fontFamily="Impact"
                fill={color}
            >{"OK"}</text >
        </>
    )
}