import { CELL_WIDTH } from "../etc/Const";
import { Inyago } from "../models/Inyago";

type Props = {
    inyago: Inyago;
}
export default function InyagoElement(props: Props) {
    return (
        <rect
            x={props.inyago.position.x}
            y={props.inyago.position.y}
            width={CELL_WIDTH}
            height={CELL_WIDTH}
            fill="red"
        />
    )
}