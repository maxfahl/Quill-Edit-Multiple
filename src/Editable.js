import React, { useEffect, useRef } from "react";

const Editable = ({ editable, content, quillContainer, onActivate }) => {
    const contentEl = useRef();
    const quillEditorParent = useRef();

    useEffect(() => {
        contentEl.current.innerHTML = content;
    }, [content]);

    useEffect(() => {
        if (quillEditorParent) {
            if (quillContainer)
                quillEditorParent.current.appendChild(quillContainer.current);
            else quillEditorParent.current.innerHTML = "";

            quillEditorParent.current.style.display = quillContainer
                ? "block"
                : "none";
            contentEl.current.style.display = quillContainer ? "none" : "block";
        }
    }, [quillEditorParent, quillContainer]);

    const activateMe = () => {
        if (!quillContainer) onActivate(editable);
    };

    return (
        <div
            className="editable"
            id={editable.id}
            style={{
                position: "relative",
                flexGrow: 1,
				flexBasis: 0,
                width: 0
            }}
            onDoubleClick={activateMe}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "none"
                }}
                ref={quillEditorParent}
            ></div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "2rem"
                }}
                ref={contentEl}
            ></div>
        </div>
    );
};

export default Editable;
