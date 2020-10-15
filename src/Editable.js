import React, { useEffect, useRef } from "react";

const Editable = ({ editable, content, quillEditorContainer, onChangeActive, isActive }) => {
	// The element that will displat my editable's content when the editor is not active
    const contentEl = useRef();
    // The element that will contain the quill editor element when I'm the active Editable
    const quillEditorParent = useRef();

    // Set the contents of my contentEl when it changes
    useEffect(() => {
        contentEl.current.innerHTML = content;
    }, [content]);

	/**
	 * When prop isActive is true, detach the quill editor element
	 * from the temporary container of App, moving it to my own container for it.
	 *
	 * Also, toggle the visibility of contentEl and quillEditorParent depending
	 * on if I'm active or not.
	 */
	useEffect(() => {
        if (isActive)
			quillEditorParent.current.appendChild(quillEditorContainer.current);

		quillEditorParent.current.style.display = isActive ? "block" : "none";
		contentEl.current.style.display = isActive ? "none" : "block";
    }, [quillEditorParent, quillEditorContainer, isActive]);

	/**
	 * Message App that I want to be the active editable.
	 */
	const activate = (active) => {
		onChangeActive(editable, active);
	};

	/**
	 * If I'm the active Editable, listen for user hitting the escape button
	 * and deactivate me.
	 */
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
	}, [isActive, activate]);

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
