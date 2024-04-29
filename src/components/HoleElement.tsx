import { CELL_WIDTH } from "../etc/Const";

type Props = {
    point: { x: number, y: number };
}
export default function HoleElement(props: Props) {
    const cx = (props.point.x + 0.5) * CELL_WIDTH;
    const cy = (props.point.y + 0.5) * CELL_WIDTH;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={CELL_WIDTH / 2.5}
            fill="black"
        />
    )
}