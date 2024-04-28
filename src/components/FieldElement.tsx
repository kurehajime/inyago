import { CELL_WIDTH, FIELD_SIZE, FIELD_WIDTH } from "../etc/Const";
import { Tile } from "../models/Tile";

export default function FieldElement() {
    const tiles: Array<Tile> = [];
    const white = "#FFFFFF";
    const black = "#EEEEEE";
    for (let row = 0; row < FIELD_SIZE; row++) {
        for (let col = 0; col < FIELD_SIZE; col++) {
            tiles.push({
                x: col * CELL_WIDTH,
                y: row * CELL_WIDTH,
                width: CELL_WIDTH
            });
        }
    }

    return (
        <svg
            width={FIELD_WIDTH}
            height={FIELD_WIDTH}
        >
            {
                tiles.map((tile, index) => {
                    return (
                        <rect
                            key={index}
                            x={tile.x}
                            y={tile.y}
                            width={tile.width}
                            height={tile.width}
                            fill={(index + 1) % 2 === 0 ? black : white}
                        />
                    )
                })
            }
        </svg>
    )
}