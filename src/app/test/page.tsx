'use client'
import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    closestCenter,
    useSensor,
    useSensors
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable"

import { useState } from "react"
import dynamic from 'next/dynamic';
import Grid from "../components/adminComponents/Grid";

const SortableItem = dynamic(() => import("../components/adminComponents/SortableItem"), {
    ssr: false,
});

export default function Page() {
    const [languages, setLanguages] = useState(["Java", "Python", "Ruby", "Kotlin", "Kek", "Lolkek"])
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    })
    
    const sensors = useSensors(mouseSensor)


    return (
        <main className="flex flex-col items-center justify-between align-middle space-y-8">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handlerDragEnd}
                sensors={sensors}
            >
                <p className=" p-9">Halo</p>
                <SortableContext
                    items={languages}
                    strategy={rectSortingStrategy}
                >
                    <Grid columns={5}>
                    {languages.map(language => <SortableItem key={language} item={language} />)}
                    </Grid>
                    
                </SortableContext>
            </DndContext>
        </main>
    )

    function handlerDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (active.id !== over?.id) {
            setLanguages(() => {
                const activeIndex = languages.indexOf(String(active.id))
                const overIndex = languages.indexOf(String(over?.id))
                return arrayMove(languages, activeIndex, overIndex)
            })
        }
    }
}
