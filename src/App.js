import "./App.css";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Editable from "./Editable";

const App = () => {
    const quillToolbarContainer = useRef();
    const quillContainer = useRef();

    const [quillInstance, setQuillInstance] = useState();
    const [editables, setEditables] = useState([]);
    const [activeEditable, setActiveEditable] = useState();

    useEffect(() => {
        // let Font = Quill.import("formats/font");
        // Font.whitelist = ["roboto", "arial"];
        // Quill.register(Font, true);

        const quill = new Quill(quillContainer.current, {
            theme: "snow",
            modules: {
                toolbar: quillToolbarContainer.current
            }
        });

        // quill.format("roboto", "arial");

        setQuillInstance(quill);
        setEditables([
            {
                id: "editable-1",
                content: "<p>Hello, this is a text for editable 1.</p>"
            },
            {
                id: "editable-2",
                content: "<p>Hello, this is a text for editable 2.</p>"
            },
            {
                id: "editable-3",
                content: "<p>Hello, this is a text for editable 3.</p>"
            }
        ]);
    }, []);

    const activateEditable = (editable) => {
        const delta = quillInstance.clipboard.convert(editable.content);
        quillInstance.setContents(delta, "silent");
        // window.setTimeout(quillInstance.setSelection(0, quillInstance.getLength() - 1), 1000);
        setActiveEditable(editable);
    };

    return (
        <div
            className="App"
            style={{
                position: "relative",
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                style={{
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
					justifyContent: 'center',
					borderBottom: '1px solid #ccc'
                }}
            >
                <div ref={quillToolbarContainer}>
                    <select className="ql-size" defaultValue={"normal"}>
                        <option value="small"></option>
                        <option value="normal"></option>
                        <option value="large"></option>
                        <option value="huge"></option>
                    </select>

                    {/*<select className="ql-font" defaultValue={"roboto"}>*/}
                    {/*    <option value="roboto"></option>*/}
                    {/*    <option value="arial"></option>*/}
                    {/*</select>*/}

                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-strike"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-code"></button>
                </div>
            </div>

            <div
                className="editables-container"
                style={{ flex: "1 1 auto", display: "flex" }}
            >
                {editables.map((editable) => (
                    <Editable
                        editable={editable}
                        content={editable.content}
                        onActivate={activateEditable}
                        quillContainer={
                            activeEditable === editable
                                ? quillContainer
                                : undefined
                        }
                        key={editable.id}
                    />
                ))}
            </div>

            <div style={{ position: "absolute", left: "100vw", top: 0 }}>
                <div
                    ref={quillContainer}
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
