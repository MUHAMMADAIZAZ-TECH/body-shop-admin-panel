// const headers = { 'Content-Type': 'application/json'};
export const userLogin = async ( state ) =>{
    try {
        const response = await fetch(`https://62ef-119-73-96-12.ngrok-free.app/api/v1/users/login`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": state.username,
                "password": state.password,
              })
        })
        const data = await response.json();
        localStorage.setItem('token',data.token)
        return data;
    } catch (error) {
        console.log("Error",error)
        return error;
    }
}