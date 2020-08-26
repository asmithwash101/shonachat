import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from '../services/firebase'
import io from 'socket.io-client';
 


export default function App() {
    const [msgs, setMsgs] = useState([{
        text: 'first'
    }]);
    const [typing, setTyping] = useState(false)
    const [user, setUser] = useState('ajani')

    const { register, handleSubmit, watch, errors } = useForm();
    const socket = io('http://127.0.0.1:4000');

    useEffect(() => {
        socket.on("chat message", data => {
            console.log(`chat message: ${data}`)
            const newMsg = {
                text: data
            }
            setMsgs(msgs => [...msgs, newMsg])
        });
    }, []);


    const onSubmit = async (data, e) => {
        try {
            setTyping(false)
            const text = data.msg
            e.target.reset()
            const newMsg = {
                text
            }
            socket.emit("chat message", text);
            //setMsgs(msgs => [...msgs, newMsg])
            //const write = await newMessage(text)
            console.log(msgs)
            
        } catch (error) {
            console.log(error)
        }

    }



    // useEffect(
    //     () => {
    //       const unsubscribe = db
    //         .collection('messages')
    //         .onSnapshot(
    //           snapshot => {
    //             snapshot.docChanges().forEach(function(change) {
    //                 if (change.type === "added") {
    //                     console.log("New city: ", change.doc.data());
    //                 }
    //                 if (change.type === "modified") {
    //                     console.log("Modified city: ", change.doc.data());
    //                 }
    //                 if (change.type === "removed") {
    //                     console.log("Removed city: ", change.doc.data());
    //                 }
    //             });
    //           },
    //           err => {
    //             setError(err)
    //           }
    //         )
    
    //       // returning the unsubscribe function will ensure that
    //       // we unsubscribe from document changes when our id
    //       // changes to a different value.
    //       return () => unsubscribe()
    //     },

    //   )

    const newMessage = (text) => {
        return db.collection('messages')
            .add({
                sender: user,
                text
            });
    };

    const handleOptionChange = changeEvent => {
        setUser(changeEvent.target.value)
    };



    console.log(watch("example")); // watch input value by passing the name of it



    return (
        <div>
            <div>
                <form>
                    <label for="ajani">ajani</label>
                    <input name="ajani" value="ajani" onChange={handleOptionChange} checked={user === "ajani"} type="radio" /><br />
                    <label for="shona">shona</label>
                    <input name="shona" value="shona" onChange={handleOptionChange} checked={user === "shona"} type="radio" />
                </form>
            </div>
            <div>
                {`User is: ${user}`}
            </div>
            <div>
                {(typing ? 'Ajani is typing' : "")}
            </div>
            <div>
                {msgs.map((elem) => {
                    return (
                        <div>{elem.text}</div>
                    )
                })}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* include validation with required or other standard HTML validation rules */}
                <input name="msg" ref={register({ required: true })} onChange={(event) => {
                    if (event.target.value) {
                        setTyping(true)
                    } else {
                        setTyping(false)
                    }
                }} />
                {/* errors will return when field validation fails  */}
                {errors.msg && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>

    );
}

// import React from 'react';
// import { useForm } from "react-hook-form";




// export default function chat() {
//     const { register, handleSubmit, watch, errors } = useForm()
//     const onSubmit = data => console.log(data);

//     const messages = [
//         {
//             text: "high"
//         },
//         {
//             text: "bi"
//         }
//     ]

//     console.log(watch("example")); // watch input value by passing the name of it

//     return (
//         <div>
//             {messages.map((elem) => {
//                 return (
//                     <div>{elem.text}</div>
//                 )
//             })}
//             <form onSubmit={handleSubmit(onSubmit)}>

//                 <input name="example" defaultValue="test" ref={register} />


//                 <input name="exampleRequired" ref={register({ required: true })} />

//                 {errors.exampleRequired && <span>This field is required</span>}

//                 <input type="submit" />
//             </form>
//         </div>

//     );
// }
