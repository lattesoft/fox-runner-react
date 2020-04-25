import React from 'react';
import axios from "axios";
import API from "../constants/API";
import {Redirect} from 'react-router-dom';
import { withRouter } from "react-router-dom";

export const withUser = Component => {
    function NextComponent(props){
        let profile = localStorage.getItem("facebookProfile");
        if(profile){
            profile = JSON.parse(profile);
            return profile ? (
                <Component {...props} foxInfo={{
                    name: profile.first_name,
                    image: `http://graph.facebook.com/${profile.id}/picture?type=large`,
                    hp: 500,
                    fullHp: 500
                }} logout={(e)=>{
                    e.preventDefault();
                    localStorage.removeItem("facebookProfile");
                    props.endGame();
                    props.history.push("/form");
                    return false;
                }}/>
            ) : <Redirect to="/form"/>
        } else {
                return props.foxInfo.name ? <Component 
                {...props}
                logout={(e)=>{
                    e.preventDefault();
                    props.endGame();
                    localStorage.removeItem("facebookProfile");
                    props.history.push("/form");
                    return false;
                }}
                 /> : <Redirect to="/form"/>
            
        }
        
    }
    return withRouter(NextComponent);
}

export const getFacebookProfile = async (accessToken) => {
    try {
        const profileRes = await axios.get(
            API.FACEBOOK + accessToken
        );
        localStorage.setItem(
            "facebookProfile",
            JSON.stringify(profileRes.data)
          );
        return profileRes.data;
    } catch (e) {
        console.log(e);
    }
}