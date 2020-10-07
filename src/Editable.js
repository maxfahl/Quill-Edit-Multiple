import React, { useEffect, useRef } from "react";

const Editable = ({ editable, content, quillEditorContainer, onChangeActive, isActive }) => {
    const contentEl = useRef();
    const quillEditorParent = useRef();

    useEffect(() => {
        contentEl.current.innerHTML = content;
    }, [content]);

    useEffect(() => {
        if (isActive)
			quillEditorParent.current.appendChild(quillEditorContainer.current);
		else
			quillEditorParent.current.innerHTML = "";

		quillEditorParent.current.style.display = isActive ? "block" : "none";
		contentEl.current.style.display = isActive ? "none" : "block";
    }, [quillEditorParent, quillEditorContainer, isActive]);

    useEffect(() => {
    	if (isActive) {
    		const onKeyUp = (event) => {
    			if (event.code === 'Escape') {
					activate(false);
				}
			};

    		document.addEventListener('keyup', onKeyUp);
    		return () => document.removeEventListener('keyup', onKeyUp);
		}
	}, [isActive]);

    const activate = (active) => {
        onChangeActive(editable, active);
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
            onDoubleClick={() => activate(true)}
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
