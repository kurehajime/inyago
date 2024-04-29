import { CELL_WIDTH } from "../etc/Const";
import { Esa } from "../models/Esa";
type Props = {
    esa: Esa;
}
export default function EsaElement(props: Props) {
    if (props.esa) {
        return (
            <>
                <rect
                    x={props.esa.point.x * CELL_WIDTH}
                    y={props.esa.point.y * CELL_WIDTH}
                    width={CELL_WIDTH}
                    height={CELL_WIDTH}
                    fill={props.esa.esaType === "normal" ? "green" : "blue"}
                />
            </>
        )
    } else {
        return (
            <></>
        )
    }
}