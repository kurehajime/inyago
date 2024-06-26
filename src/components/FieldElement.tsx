import { Arrow, CELL_WIDTH, FIELD_SIZE, FIELD_WIDTH, State } from "../etc/Const";
import { Inyago } from "../models/Inyago";
import { Position } from "../models/Position";
import EsaElement from "./EsaElement";
import InyagoElement from "./InyagoElement";
import { Point } from "../models/Point";
import HoleElement from "./HoleElement";
import { Esa } from "../models/Esa";
import ScoreElement from "./ScoreElement";
import hint from '../assets/hint.png'
import './FieldElement.css'
type Props = {
    inyagos: Inyago[];
    esas: Esa[];
    state: State;
    time: number;
    holes: Point[];
    level: number;
    allow: Arrow;
}

export default function FieldElement(props: Props) {
    const tiles: Array<Position> = [];
    const white = "#FFFFFF";
    const black = "#EEEEEE";
    let mission = "";
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            tiles.push({
                x: col * CELL_WIDTH,
                y: row * CELL_WIDTH,
            });
        }
    }

    const count = props.inyagos.length;
    switch (props.level) {
        case 1:
            if (count < 30) {
                mission = `あと${30 - count}匹`;
            }
            break;
        case 2:
            if (count < 50) {
                mission = `あと${50 - count}匹`;
            }
            break;
        default:
            break;
    }

    return (
        <><>
            {
                tiles.map((tile, index) => {
                    const c = index % FIELD_SIZE;
                    const r = Math.floor(index / FIELD_SIZE);
                    const isWall = c === 0 || r === 0 || c === FIELD_SIZE - 1 || r === FIELD_SIZE - 1;
                    let tileColor = (index + 1) % 2 === 0 ? black : white;
                    tileColor = isWall ? "#333333" : tileColor;
                    return (
                        <rect
                            key={index}
                            x={tile.x}
                            y={tile.y}
                            width={CELL_WIDTH}
                            height={CELL_WIDTH}
                            fill={tileColor}
                        />
                    )
                })
            }
        </>
            <>
                {
                    props.holes.map((hole, index) => {
                        return (
                            <HoleElement
                                key={index}
                                point={hole}
                            />
                        )
                    })
                }
            </>
            <>
                {
                    props.esas.map((esa, index) => {

                        return (
                            <EsaElement
                                key={index}
                                esa={esa}
                            />
                        )
                    })
                }
            </>
            <>
                {
                    props.inyagos.map((inyago, index) => {
                        return (
                            <InyagoElement
                                key={index}
                                inyago={inyago}
                                time={props.time}
                                no={index}
                            />
                        )
                    })
                }
            </>
            {
                props.state !== "start" ? <text
                    x={CELL_WIDTH * 1}
                    y={CELL_WIDTH * 0.9}
                    textAnchor="start"
                    fontWeight={"bold"}
                    fontSize="50"
                    fontFamily="Impact"
                    fill={"white"}
                >{mission}</text> : null
            }
            {
                props.state === "playing" && props.allow === "" ? <>
                    <image
                        className="hint"
                        x={0}
                        y={0}
                        width={FIELD_WIDTH}
                        height={FIELD_WIDTH}
                        href={hint}
                    />
                    <text
                        className="hint"
                        x={CELL_WIDTH * 7}
                        y={CELL_WIDTH * 8}
                        width={FIELD_WIDTH}
                        textAnchor="end"
                        fontWeight={"bold"}
                        fontSize="25"
                        fontFamily="Impact"
                        fill={"black"}>
                        餌を食べて
                    </text>
                    <text
                        className="hint"
                        x={CELL_WIDTH * 8}
                        y={CELL_WIDTH * 7}
                        width={FIELD_WIDTH}
                        textAnchor="middle"
                        fontWeight={"bold"}
                        fontSize="25"
                        fontFamily="Impact"
                        fill={"black"}>
                        上下左右に移動して
                    </text>
                    <text
                        className="hint"
                        x={CELL_WIDTH * 8}
                        y={CELL_WIDTH * 8}
                        width={FIELD_WIDTH}
                        textAnchor="start"
                        fontWeight={"bold"}
                        fontSize="25"
                        fontFamily="Impact"
                        fill={"black"}>
                        を増やそう
                    </text>
                </> : null
            }
            <ScoreElement score={props.inyagos.length} />
        </>
    )
}