"use client";
import React, { createRef, useEffect, useState } from "react";
// import Admonition from "@theme/Admonition";
import katex from "katex/dist/contrib/auto-render";
import Admonition from "./Admonition";

const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default ({
    question,
    answers = ["A", "B", "C", "D"],
    correct = answers[0],
    children,
}) => {
    let shuffle = true;
    if (answers[0] == "A" || answers[0] == "a") shuffle = false;
    const [isClient, setIsClient] = useState(false)

    let quiz = createRef(null);
    useEffect(() => {
        setIsClient(true)
        if (quiz.current) 
            katex(quiz.current, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    { left: "\\(", right: "\\)", display: false },
                    { left: "\\[", right: "\\]", display: true },
                ],
            });
    });

    const handleClick = () => {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;
        if (selected.value === correct) {
            selected.parentElement.style.backgroundColor = "#8bc34a";
        } else {
            selected.parentElement.style.backgroundColor = "#f44336";
        }
        document.querySelectorAll('input[name="answer"]').forEach((input) => {
            if (input.value === correct) {
                input.parentElement.style.backgroundColor = "#8bc34a";
            }
            input.disabled = true;
        });
    }

    if (!isClient) return <></> 
    return (
        <Admonition type="normal" title="Quiz" icon="📋">
            <div id="quiz" ref={quiz}>
                <h3>{question}</h3>
                {children}
                <div id="answers">
                    {(shuffle ? shuffleArray(answers) : answers).map(
                        (answer, i) => (
                            <div key={i} className="answer">
                                <input
                                    type="radio"
                                    id={`answer-${i}`}
                                    name="answer"
                                    value={answer}
                                />
                                <label htmlFor={`answer-${i}`} id="answer" style={{marginLeft: "1rem"}}>
                                    {answer}
                                </label>
                            </div>
                        )
                    )}
                </div>
                <button onClick={handleClick} id="submit" style={{padding: "0.6rem", borderRadius: "0.3rem", backgroundColor: "#8bc34a"}}>Check</button>
            </div>
        </Admonition>
    );
};
