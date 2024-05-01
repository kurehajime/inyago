import './EsaElement.css'
import { CELL_WIDTH } from "../etc/Const";
import { Esa } from "../models/Esa";
import esa1 from '../assets/esa1.png'
import esa2 from '../assets/esa2.png'
type Props = {
    esa: Esa;
}
export default function EsaElement(props: Props) {
    if (props.esa) {
        return (
            <>
                <image
                    className={props.esa.esaType}
                    x={props.esa.point.x * CELL_WIDTH}
                    y={props.esa.point.y * CELL_WIDTH}
                    width={CELL_WIDTH}
                    height={CELL_WIDTH}
                    href={props.esa.esaType === "normal" ? esa1 : esa2}
                />
                {
                    props.esa.esaType === "special" ? <text
                        x={props.esa.point.x * CELL_WIDTH + CELL_WIDTH / 2}
                        y={props.esa.point.y * CELL_WIDTH + CELL_WIDTH / 1.2}
                        textAnchor="middle"
                        fontWeight={"bold"}
                        fontSize="20"
                        fill={"#FFFFFF"}
                    >3</text> : <></>
                }
            </>
        )
    } else {
        return (
            <></>
        )
    }
}