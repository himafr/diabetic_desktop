// hide welcome popup 

document.getElementById("welcome").addEventListener("click", function(){
    this.classList.add("animate__animated");
    this.style.animationDuration="2.5s";
    this.classList.add("animate__fadeOut");
    setTimeout(()=>{this.style.display='none';},2000)
})


let username=document.getElementById('username')
let password=document.getElementById('password')
document.cookie

let logBtn =document.querySelector("#login");
let loader=document.querySelector("#loader");
logBtn.addEventListener("click", function(e){
    e.preventDefault();
    loader.style.display='block';
    let data=JSON.stringify({username:username.value,password:password.value})
        fetch(`${url_dev}api/v1/users/login`,{ 
            method: 'POST',
            body:data,
            headers: {'Content-Type': 'application/json'},
        }).then(response =>response.json())
        .then(res=>{
            if(res.status=='success'){
                if(res.data.userData.role=='admin'){
           localStorage.jwt_token=res.token
           window.location.href='../index.html'
        }else{
            document.getElementById('error').innerHTML="only admin is allowed to access this application";
            loader.style.display='none';
                setTimeout(()=>{document.getElementById('error').innerHTML=''},5000)
        }
        }else{
            document.getElementById('error').innerHTML=res.message;
        loader.style.display='none';
            setTimeout(()=>{document.getElementById('error').innerHTML=''},5000)
        }
    }).catch(error =>{
        document.getElementById('error').innerHTML="Something Went Wrong Please Try Again Later"
;
        loader.style.display='none';
        setTimeout(()=>{document.getElementById('error').innerHTML=''},5000)
    })
})
