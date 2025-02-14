'use client'

import { useEffect, useState, useCallback, useRef } from "react";
import globalEventEmitter from "../events/event-emitter";

export const useEventEmitter = (eventName) => {
    const [eventData, setEventData] = useState(null)
    const skipRerender = useRef(false)

    useEffect(() => {
        const listener = (event) => {
            if (skipRerender.current) {
                skipRerender.current = false
                return
            }
            setEventData(event.detail)
        }

        globalEventEmitter.addEventListener(eventName, listener)

        return () => {
            globalEventEmitter.removeEventListener(eventName, listener)
        }
    }, [eventName, skipRerender])

    const publishEvent = useCallback(
        (eventData, skipRender = true) => {
            const event = new CustomEvent(eventName, { detail: eventData })
            globalEventEmitter.dispatchEvent(event)
        },
        [eventName]
    )

    return { eventData, publishEvent }
}