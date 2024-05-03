import { CELL_WIDTH } from "../etc/Const";
import title from '../assets/title.png'
import level1 from '../assets/level1.png'
import level2 from '../assets/level2.png'
import level3 from '../assets/level3.png'
import './TitleElement.css'
type Props = {
    selectLevel: number;
}
export default function TitleElement(props: Props) {
    let selectedX = 0
    let color = "white"
    switch (props.selectLevel) {
        case 1:
            selectedX = CELL_WIDTH * 2
            color = "#f9e230"
            break;
        case 2:
            selectedX = CELL_WIDTH * 6
            color = "#61d838"
            break;
        case 3:
            selectedX = CELL_WIDTH * 10
            color = "#00a1fe"
            break;
    }
    return (
        <>
            <image
                className="title"
                x={CELL_WIDTH * 4}
                y={CELL_WIDTH * 2}
                width={CELL_WIDTH * 7}
                height={CELL_WIDTH * 5}
                href={title}
            />
            <rect
                className="selected"
                x={selectedX - 5}
                y={CELL_WIDTH * 9 - 5}
                width={CELL_WIDTH * 3 + 10}
                height={CELL_WIDTH * 3 + 10}
                fill={color}></rect>
            <image
                x={CELL_WIDTH * 2}
                y={CELL_WIDTH * 9}
                width={CELL_WIDTH * 3}
                height={CELL_WIDTH * 3}
                href={level1}></image>
            <image
                x={CELL_WIDTH * 6}
                y={CELL_WIDTH * 9}
                width={CELL_WIDTH * 3}
                height={CELL_WIDTH * 3}
                href={level2}></image>
            <image
                x={CELL_WIDTH * 10}
                y={CELL_WIDTH * 9}
                width={CELL_WIDTH * 3}
                height={CELL_WIDTH * 3}
                href={level3}></image>
        </>
    )
}