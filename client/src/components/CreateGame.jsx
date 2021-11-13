import React,{useState} from 'react'
import socket from "../socketConfig";

const CreateGame = () => {

    const [nickName,setNickName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('create-game',nickName);
        
    }

    return (
        <>
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm-8">
                    <h1 className="text-center">
                        Create Game
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nickname">Your Nickname</label>
                            <input type="text" name="nickname" value={nickName} onChange={e=>setNickName(e.target.value)} placeholder="Enter your NickName" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </>
    )
}

export default CreateGame
