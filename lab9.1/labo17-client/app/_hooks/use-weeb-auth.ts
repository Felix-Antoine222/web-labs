import axios from "axios";

const domain = "http://localhost:5257/";

export function useWeebAuth(){

    async function register(user : string, mail : string, pass : string, passCon : string){

        const x = await axios.post(domain + "api/Users/Register", {
            username : user, 
            email : mail, 
            password : pass, 
            passwordConfirm : passCon
        });
        console.log(x.data);

    }

    async function login(user : string, pass : string){

        const x = await axios.post(domain + "api/Users/Login", {
            username : user, 
            password : pass
        });
        console.log(x.data);
        sessionStorage.setItem("token", x.data)

    }

    async function logout(){

        sessionStorage.removeItem("token");

    }

    return { register, login, logout };

}