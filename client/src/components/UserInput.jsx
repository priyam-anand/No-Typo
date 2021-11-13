import React,{useState,useEffect,useRef} from 'react'
import socket from "../socketConfig";


const UserInput = ({isOpen,isOver,gameId}) => {

    const [userInput,setUserInput] = useState("");
    const textInput = useRef(null);

    useEffect(()=>{
        if(!isOpen){
            textInput.current.focus();
        }
    },[isOpen]);

    const resetForm = () => {
        setUserInput("");
    }

    const handleOnChange = (e) => {
        let value = e.target.value;
        let lastChar = value.charAt(value.length-1);
        if(lastChar === " "){
            socket.emit('user-input',{userInput,gameId});
            resetForm();
        }
        else{
            setUserInput(value);
        }
    }

    return (
        <div className="row my-3">
            <div className="col-sm"></div>
            <div className="col-sm-4">
                <form>
                    <div className="form-group">
                        <input type="text" readOnly={isOpen || isOver} onChange={handleOnChange} value={userInput} className="form-control" ref={textInput}/>
                    </div>
                </form>
            </div>
            <div className="col-sm"></div>
        </div>
    )
}

export default UserInput
