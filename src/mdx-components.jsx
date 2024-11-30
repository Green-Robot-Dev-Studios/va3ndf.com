import Border from "./components/Border";
import Desmos from "./components/Desmos";
import Quiz from "./components/Quiz";
import Excalidraw from "./components/Excalidraw";
import Admonition from "./components/Admonition";
import Image from "next/image";

export function useMDXComponents(components) {
    return {
        ...components,
        Border,
        Desmos,
        Quiz,
        Excalidraw,
        Admonition,
        img: (props) => <Image {...props} />,
        Image: (props) => <Image {...props} />,
    };
}
