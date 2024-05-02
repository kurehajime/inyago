import React, { useEffect } from "react";
import { Arrow, CELL_WIDTH, FIELD_WIDTH, State } from "../etc/Const";

type Props = {
    touched: (arrow: Arrow) => void;
    gameStart: () => void;
    turned: boolean;
    arrow: Arrow;
    state: State;
}
export default function CoverElement(props: Props) {
    const ref = React.useRef<SVGRectElement>(null)
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)
    const [mouseStartX, setMouseStartX] = React.useState<number>(0)
    const [mouseStartY, setMouseStartY] = React.useState<number>(0)
    const [touched, setTouched] = React.useState<boolean>(false)

    const resetXY = (x: number, y: number) => {
        if (x !== mouseStartX || y !== mouseStartY) {
            setMouseStartX(x)
            setMouseStartY(y)
        }
    }

    const touchStart = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
        if (props.state === "gameover") {
            props.gameStart()
            return;
        }
        resetXY(x, y)
        setMouseX(x)
        setMouseY(y)
        setTouched(true)
        e.preventDefault()
    }

    const touchEnd = (event: Event) => {
        const e = event as PointerEvent
        setTouched(false)
        e.preventDefault()
    }

    const touchMove = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
        setMouseX(x)
        setMouseY(y)
        if (touched) {
            check(x, y)
        }
    }

    const check = (x: number, y: number) => {
        const diff_x = x - mouseStartX;
        const diff_y = y - mouseStartY;
        const threshold = CELL_WIDTH / 2;
        let arrow = ""
        if (Math.abs(diff_x) > Math.abs(diff_y)) {
            if (diff_x > threshold) {
                arrow = "ArrowRight"
            } else if (diff_x < - threshold) {
                arrow = "ArrowLeft"
            }
        } else if (Math.abs(diff_x) < Math.abs(diff_y)) {
            if (diff_y > threshold) {
                arrow = "ArrowDown"
            } else if (diff_y < - threshold) {
                arrow = "ArrowUp"
            }
        }

        if (
            arrow === "" ||
            (props.arrow === "ArrowDown" && arrow === "ArrowUp") ||
            (props.arrow === "ArrowUp" && arrow === "ArrowDown") ||
            (props.arrow === "ArrowLeft" && arrow === "ArrowRight") ||
            (props.arrow === "ArrowRight" && arrow === "ArrowLeft")
        ) {
            // 明確に自滅するような逆走は無視
            return;
        }
        resetXY(x, y)
        props.touched(arrow as Arrow)
    }

    useEffect(() => {
        ref.current?.addEventListener("pointerdown", touchStart)
        ref.current?.addEventListener("pointerup", touchEnd)
        ref.current?.addEventListener("pointermove", touchMove)
        return () => {
            ref.current?.removeEventListener("pointerdown", touchStart)
            ref.current?.removeEventListener("pointerup", touchEnd)
            ref.current?.removeEventListener("pointermove", touchMove)
        }
    },)

    if (props.turned && touched) {
        resetXY(mouseX, mouseY)
    }

    return (
        <rect
            ref={ref}
            x="0"
            y="0"
            width={FIELD_WIDTH}
            height={FIELD_WIDTH}
            fill="transparent"
        ></rect>
    )
}