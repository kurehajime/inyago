import { CELL_WIDTH } from "../etc/Const";
import title from '../assets/title.png'
import level1 from '../assets/level1.png'
import level2 from '../assets/level2.png'
import level3 from '../assets/level3.png'
export default function TitleElement() {
    return (
        <>
            <image
                x={CELL_WIDTH * 4}
                y={CELL_WIDTH * 2}
                width={CELL_WIDTH * 7}
                height={CELL_WIDTH * 5}
                href={title}
            />
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