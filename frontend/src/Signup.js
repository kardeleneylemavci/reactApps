
import React, { useEffect, useState } from "react";
import axios from "axios";
function Signup() {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDesc] = useState(null);
    const [author, setAuthor] = useState(null);
    const [userObj, setUserObj] = useState({});
    const [changer, setChanger] = useState(false);
    const ServerEndPoint = "http://localhost:8000/";

    useEffect(() => {
        //setUserObj({name:userName, pass:password});
    }, [changer]);

    const userSave = () => {
        let userData = {
            title,
            description,
            author
        };
        /*  if(password && userName){
             setChanger(!changer);
         } */
        //axios.get(ServerEndPoint+'news/save?title='+title+'&desc='+description+'&author='+author); //backend req.query olarak karşılanaca
        //axios.get(ServerEndPoint+'news/'+title+'/'+description+'/'+author); // backend req.params.vs...
        //axios.get(ServerEndPoint+`news/${title}/${desc}`);// backend req.params.vs...
        axios.post(ServerEndPoint + 'deneme', userData).then(res => console.log(res)).catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                <input name="user-name" onChange={(event) => setTitle(event.target.value)} />
                <input name="user-password" onChange={(event) => setDesc(event.target.value)} />
                <input name="user-password" onChange={(event) => setAuthor(event.target.value)} />
                <button onClick={() => userSave()}>Save</button>
            </div>
            <div>
                {
                    userObj
                        ?
                        <div>
                            {userObj.name}
                            <br />
                            {userObj.pass}
                        </div>
                        : "Kullanıcı Datası Oluşmadı"
                }
            </div>
        </div>
    )
}

export default Signup;