import { CELL_WIDTH } from "../etc/Const";
import hole from '../assets/hole.png'

type Props = {
    point: { x: number, y: number };
}
export default function HoleElement(props: Props) {
    return (
        <image
            x={props.point.x * CELL_WIDTH}
            y={props.point.y * CELL_WIDTH}
            width={CELL_WIDTH}
            height={CELL_WIDTH}
            href={hole}
        />
    )
}