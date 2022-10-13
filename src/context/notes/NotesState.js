import react, { useState } from "react";
import NoteContext from "./noteContext";

// This is our Context API 
const NoteState = (props) => {
    const s1 = {
        "name":"harry",
        "class" : "sb"
    }

    // To Update these values we will use use State 
    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({"name" : "Brijal", "class" : "A"})
        }, 5000)
    }

    return (
        // Remember the Syntex 
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;