import React, { useState, useEffect ,useContext} from 'react';

import axios from 'axios';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
var qs = require('qs');

function Posting() {
    const [user,setuser] = useState({
      linked_in:{
        first_name:"",
        last_name:"",
        img:""
      }
    })
   
    useEffect(()=>{
        //console.log(`${window.location.origin}/linkedin` )
    },[])
    
    const { linkedInLogin } = useLinkedIn({
        clientId: '77mou4fomktltm',
        scope:"r_liteprofile r_emailaddress",
        redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: async (code) => {
          //console.log(code);
          //console.log(`${window.location.origin}/linkedin`)
          
          await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            {
                grant_type:"authorization_code",
                code:code,
                client_id:"77mou4fomktltm",
                client_secret:"SG07p3bQNfQvxCcK",
                redirect_uri:`${window.location.origin}/linkedin`
            } ,
            {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}
          ).then(async function (res){
            //console.log(res.data.access_token)
            await axios.get(
              "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
              {headers: { 'Authorization': `Bearer ${res.data.access_token}`}})
              .then(async function (res){
                //console.log(res.data)
                var userc = Object.assign({},user)
                userc.linked_in.img=res.data.profilePicture["displayImage~"].elements[2].identifiers[0].identifier
                userc.linked_in.first_name=res.data.firstName.localized.ar_AE
                userc.linked_in.last_name=res.data.lastName.localized.ar_AE
               
                setuser(userc)
              })

          }).catch(function (error){
           // console.log(error)
          })
          

        },
        onError: (error) => {
          //console.log(error);
        },
    });
    return (

            <div className="container d-flex flex-column flow_main full_page bg-dark">
                
                <img
                    onClick={linkedInLogin}
                    src={linkedin}
                    alt="Sign in with Linked In"
                    style={{ maxWidth: '180px', cursor: 'pointer' }}
                />
                <img src={user.linked_in.img} width={300} height={300}/>
                <label className='text-light'>{user.linked_in.first_name}</label>
                <label className='text-light'>{user.linked_in.last_name}</label>
            
            </div>
      
    )
}

export default Posting
