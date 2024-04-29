import { CELL_WIDTH } from "../etc/Const";
import { Inyago } from "../models/Inyago";
import down1 from '../assets/down1.png'
import down2 from '../assets/down2.png'
import up1 from '../assets/up1.png'
import up2 from '../assets/up2.png'
import left1 from '../assets/left1.png'
import left2 from '../assets/left2.png'
import right1 from '../assets/right1.png'
import right2 from '../assets/right2.png'

type Props = {
    inyago: Inyago;
    time: number;
    no: number;
}
export default function InyagoElement(props: Props) {
    let image = down1;
    const no = ((props.no + Math.round(props.time / 5)) % 2);
    const vector = props.inyago.Vector();
    let x = props.inyago.position.x;
    let y = props.inyago.position.y;
    if (vector.x === 0 && no === 1) {
        x += 2;
    }
    if (vector.y === 0 && no === 1) {
        y += 2;
    }
    if (vector.x === 0 && vector.y === -1) {
        image = no === 0 ? up1 : up2;
    }
    if (vector.x === 0 && vector.y === 1) {
        image = no === 0 ? down1 : down2;
    }
    if (vector.x === -1 && vector.y === 0) {
        image = no === 0 ? left1 : left2;
    }
    if (vector.x === 1 && vector.y === 0) {
        image = no === 0 ? right1 : right2;
    }

    return (
        <image
            x={x}
            y={y}
            width={CELL_WIDTH}
            height={CELL_WIDTH}
            href={image}
        />
    )
}