import { CELL_WIDTH } from "../etc/Const";
import { Point } from "../models/Point";

type Props = {
    esa: Point | null;
}
export default function EsaElement(props: Props) {
    if (props.esa) {
        return (
            <>
                <rect
                    x={props.esa.x * CELL_WIDTH}
                    y={props.esa.y * CELL_WIDTH}
                    width={CELL_WIDTH}
                    height={CELL_WIDTH}
                    fill="green"
                />
            </>
        )
    } else {
        return (
            <></>
        )
    }
}