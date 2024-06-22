import axios from 'axios';
import React from 'react'

const EmailUnverifiedComp = (props) => {

    const message = props.message;
    const show = props.show;
    const userData = props.userData;

    async function resendVerification(){
        
            axios.post('http://localhost:3000/resendEmailVerification', {
                email : userData.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        ).then((res) => {
            if(res.status  == 201){
                alert("Email verification link sent to user email")
            }
            
        }).catch((error) => {
                alert("There was a problem, try again")
        })

        
    }



    return (
        <div className={`emailUnverified  ${show == "true" ? "show" : "show"}`} >
            <div className="emailUnverifiedDiv">
                <img src='/cross.png' onClick={props.onClose} className='closeBtn' />
                <img src="/unverified.png" alt="" />
                <p>{message}</p>
                <button onClick={resendVerification}>Verify email</button>
            </div>
        </div>
    )
}




export default EmailUnverifiedComp