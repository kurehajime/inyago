import React, { useEffect } from "react";
import { Arrow, ButtonType, CELL_WIDTH, FIELD_WIDTH, State } from "../etc/Const";
import { Scale } from "../models/Scale";
import { Utils } from "../etc/Utils";

type Props = {
    touched: (arrow: Arrow) => void;
    gameStart: (buttonType: ButtonType) => void;
    hover: (buttonType: ButtonType) => void;
    turned: boolean;
    arrow: Arrow;
    state: State;
    scale: Scale;
}
export default function CoverElement(props: Props) {
    const ref = React.useRef<SVGRectElement>(null)
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)
    const [mouseStartX, setMouseStartX] = React.useState<number>(0)
    const [mouseStartY, setMouseStartY] = React.useState<number>(0)
    const [touched, setTouched] = React.useState<boolean>(false)
    const [downTime, setDownTime] = React.useState<number>(0)


    const resetXY = (x: number, y: number) => {
        if (x !== mouseStartX || y !== mouseStartY) {
            setMouseStartX(x)
            setMouseStartY(y)
        }
    }

    const touchStart = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) * props.scale.x;
        const y = (e.clientY - rect.top) * props.scale.y;
        resetXY(x, y)
        setMouseX(x)
        setMouseY(y)
        setTouched(true)
        setDownTime(Date.now())
        e.preventDefault()
    }

    const touchEnd = (event: Event) => {
        const e = event as PointerEvent
        setTouched(false)
        if (Date.now() - downTime < 500) {
            const buttonType = Utils.hitTest(mouseX, mouseY, props.state)
            props.gameStart(buttonType)
            return;
        }
        e.preventDefault()
    }

    const touchMove = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) * props.scale.x;
        const y = (e.clientY - rect.top) * props.scale.y;
        setMouseX(x)
        setMouseY(y)
        if (touched) {
            check(x, y)
        }
        if (props.state === "start") {
            const buttonType = Utils.hitTest(x, y, props.state)
            props.hover(buttonType)
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
            arrow === ""
        ) {
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