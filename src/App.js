import "./App.css";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editable from "./Editable";
import editablesInitialData from "./data/editables-initial-data";
import { useLocalStorageState } from "./hooks/userLocalStorageState";

const App = () => {
    // The div containing the quill editor when no instance of Editable is using it.
    const quillEditorContainerTempHolder = useRef();
    // The div that contains the quill toolbar.
    const quillToolbarContainer = useRef();
    // The quill editor
    const quillEditorContainer = useRef();
    // The quill instance
    const [quillInstance, setQuillInstance] = useState();
    // Create our staring data
    const [editables, setEditables] = useLocalStorageState(
        "quill-edit-multiple:editables",
        editablesInitialData
    );
    // Derive a list of editables from the editables object
    const editablesList = Object.keys(editables).map((key) => editables[key]);
    // The currently active editable, the one we're manipulating with quill
    const [activeEditable, setActiveEditable] = useState();

    /**
     * Instansiate the quill editor, using the quillEditorContainer as
     * the element for it. Also, use our own toolbar.
     */
    useEffect(() => {
        const quill = new Quill(quillEditorContainer.current, {
            theme: "snow",
            modules: {
                toolbar: quillToolbarContainer.current
            }
        });

        // Store the quill instance for future use
        setQuillInstance(quill);
    }, []);

    /**
     * Add event listeners to quill to update the active editable
     * when we type into the quill editor.
     */
    useEffect(() => {
        if (quillInstance && activeEditable) {
            const onTextChange = () => {
                activeEditable.content =
                    quillInstance.container.firstChild.innerHTML;
                setEditables({
                    ...editables,
                    [activeEditable.id]: activeEditable
                });
            };
            quillInstance.on("text-change", onTextChange);
            return () => quillInstance.off("text-change", onTextChange);
        }
    }, [quillInstance, activeEditable, editables, setEditables]);

    /**
     * An editable has told us it wants to activate/deactivate itself.
     *
     * On activate, update the contents of the quill editor to be the
     * contents of the activated editable, then set the current active
     * editable to the one making the request. Also, position the carret
     * of the quill editor to the end of the content.
     *
     * On deactivation, set the active editable to undefined and move
     * the quill editor DOM element back to the temp holder element.
     */
    const setEditableActive = (editable, activate) => {
        if (activate) {
            const delta = quillInstance.clipboard.convert(editable.content);
            quillInstance.setContents(delta, "silent");
            setActiveEditable(editable);
            setTimeout(() => {
                quillInstance.setSelection(
                    { index: 0, length: quillInstance.getLength() - 1 },
                    "api"
                );
            });
        } else {
            quillEditorContainerTempHolder.current.appendChild(
                quillEditorContainer.current
            );
            setActiveEditable(undefined);
        }
    };

    return (
        <div
            className="App"
            style={{
                position: "relative",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}
        >
            {/* A wrapper div for the toolbar */}
            <div
                style={{
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #ccc"
                }}
            >
                {/* Define what formats we want in the toolbar */}
                <div ref={quillToolbarContainer} className="">
                    {/*<span className="ql-formats">*/}
                    {/*    <select className="ql-font"></select>*/}
                    {/*    <select className="ql-size"></select>*/}
                    {/*</span>*/}
                    <div className="ql-formats">
                        <select className="ql-header" defaultValue={false}>
                            <option value="false"></option>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                        </select>
                    </div>
                    <span className="ql-formats">
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                        <button className="ql-strike"></button>
                    </span>
                    <span className="ql-formats">
                        <select className="ql-color"></select>
                        <select className="ql-background"></select>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-script" value="sub"></button>
                        <button className="ql-script" value="super"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-blockquote"></button>
                        <button className="ql-code-block"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                        <button className="ql-indent" value="-1"></button>
                        <button className="ql-indent" value="+1"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-direction" value="rtl"></button>
                        <select className="ql-align"></select>
                    </span>
                    {/*<span className="ql-formats">*/}
                    {/*    <button className="ql-link"></button>*/}
                    {/*    <button className="ql-image"></button>*/}
                    {/*    <button className="ql-video"></button>*/}
                    {/*    <button className="ql-formula"></button>*/}
                    {/*</span>*/}
                    <span className="ql-formats">
                        <button className="ql-clean"></button>
                    </span>
                </div>
            </div>

            <div
                className="editables-container"
                style={{ flex: "1 1 auto", display: "flex" }}
            >
                {editablesList.map((editable) => (
                    <Editable
                        editable={editable}
                        content={editable.content}
                        onChangeActive={setEditableActive}
                        quillEditorContainer={quillEditorContainer}
                        isActive={activeEditable === editable}
                        key={editable.id}
                    />
                ))}
            </div>

            {
            	/* An temporary container for the quill editor element
				 that will hold the element if no Editable is activated */
            }
            <div
                style={{ position: "fixed", left: "100vw", top: 0 }}
                ref={quillEditorContainerTempHolder}
            >
                <div
                    ref={quillEditorContainer}
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                ></div>
            </div>
        </div>
    );
};

export default App;
