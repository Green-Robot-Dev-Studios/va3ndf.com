import Border from "./components/Border";
import Desmos from "./components/Desmos";
import Quiz from "./components/Quiz";
import Excalidraw from "./components/Excalidraw";
import Admonition from "./components/Admonition";

export function useMDXComponents(components) {
    return {
        ...components,
        Border,
        Desmos,
        Quiz,
        Excalidraw,
        Admonition
    };
}
