"use client";
import dynamic from "next/dynamic";
import Admonition from "./Admonition";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    }
);

export default function (props) {
    return (
        <Admonition type="normal">
            <div style={{ height: "500px" }}>
                <Excalidraw initialData={props.file}/>
            </div>
        </Admonition>
    );
}
