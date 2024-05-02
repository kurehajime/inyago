import { CELL_WIDTH, FIELD_SIZE, State } from "../etc/Const";
import { Inyago } from "../models/Inyago";
import { Position } from "../models/Position";
import EsaElement from "./EsaElement";
import InyagoElement from "./InyagoElement";
import { Point } from "../models/Point";
import HoleElement from "./HoleElement";
import { Esa } from "../models/Esa";
import ScoreElement from "./ScoreElement";
type Props = {
    inyagos: Inyago[];
    esas: Esa[];
    state: State;
    time: number;
    holes: Point[];
}

export default function FieldElement(props: Props) {
    const tiles: Array<Position> = [];
    const white = "#FFFFFF";
    const black = "#EEEEEE";
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            tiles.push({
                x: col * CELL_WIDTH,
                y: row * CELL_WIDTH,
            });
        }
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
            <ScoreElement score={props.inyagos.length} />
        </>
    )
}