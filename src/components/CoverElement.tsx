import React, { useEffect } from "react";
import { FIELD_WIDTH } from "../etc/Const";

type Props = {
    touch: () => void;
    turned: boolean;
}
export default function CoverElement(props: Props) {
    const ref = React.useRef<SVGRectElement>(null)
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)
    const [mouseStartX, setMouseStartX] = React.useState<number>(0)
    const [mouseStartY, setMouseStartY] = React.useState<number>(0)

    const reset = (x: number, y: number) => {
        setMouseX(x)
        setMouseY(y)
        setMouseStartX(x)
        setMouseStartY(y)
    }

    const touchStart = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
        reset(x, y)
        e.preventDefault()
    }

    const touchEnd = (event: Event) => {
        const e = event as PointerEvent
        const x = mouseX
        const y = mouseY
        if (Math.sqrt((x - mouseStartX) ** 2 + (y - mouseStartY) ** 2) < 20) {
            // 
        }
        setMouseX(x)
        setMouseY(y)
        e.preventDefault()
    }

    const touchMove = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
        const diff_x = x - mouseStartX
        const diff_y = y - mouseStartY
        if (Math.abs(diff_x) < Math.abs(diff_y)) {
            // 
        } else {
            //
        }
        setMouseX(x)
        setMouseY(y)
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

    if (props.nextCommand) {
        reset(mouseX, mouseY)
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