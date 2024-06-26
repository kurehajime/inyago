import './ResultElement.css'
import { CELL_WIDTH, FIELD_SIZE } from "../etc/Const";
type Props = {
    score: number;
    clear: boolean;
    level: number;
}
export default function ResultElement(props: Props) {
    let message = "残念"
    let color = "black"
    if (props.clear) {
        message = "合格"
        color = "url(#rainbow)"
    }
    if (props.level === 3) {
        if (props.score >= 100) {
            message = "神"
            color = "url(#rainbow)"
        } else if (props.score >= 75) {
            message = "名人"
            color = "url(#rainbow)"
        } else if (props.score >= 50) {
            message = "凄腕"
            color = "url(#rainbow)"
        } else if (props.score >= 30) {
            message = "見事"
            color = "url(#rainbow)"
        }
    }


    return (
        <>
            <defs>
                <linearGradient id="rainbow" x1="20%" x2="20%" y1="20%" y2="80%" gradientUnits="userSpaceOnUse" >
                    <stop stopColor="#e60000" offset="0%" />
                    <stop stopColor="#f39800" offset="20%" />
                    <stop stopColor="#fff100" offset="40%" />
                    <stop stopColor="#009944" offset="60%" />
                    <stop stopColor="#0068b7" offset="80%" />
                    <stop stopColor="#920783" offset="100%" />
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
                stroke='white'
                strokeWidth={1}
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
                stroke='white'
                strokeWidth={5}
                opacity={0.5}
            >{(props.score.toString()).padStart(3, "0")}</text>

            <rect
                x={CELL_WIDTH * 4}
                y={CELL_WIDTH * 10}
                width={CELL_WIDTH * 7}
                height={CELL_WIDTH * 2}
                fill={"white"}
                stroke={color}
                strokeWidth={5}
                opacity={0.8}
            ></rect>
            <text
                x={CELL_WIDTH * (FIELD_SIZE / 2)}
                y={CELL_WIDTH * 12 - 20}
                textAnchor="middle"
                fontWeight={"bold"}
                fontSize="80"
                fontFamily="Impact"
                fill={color}
                stroke='white'
                strokeWidth={1}
            >{"OK"}</text >
        </>
    )
}