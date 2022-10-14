import NoteContext from "./noteContext";

// This is our Context API 
const NoteState = (props) => {
   
    return (
        // Remember the Syntex 
        <NoteContext.Provider value = {{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;