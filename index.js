var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var dataList;
var signIn = document.querySelector("#signIn");
var signUp = document.querySelector("#signUp");
var login = document.querySelector("#login");
var note = document.getElementById("note");
var signOut = document.getElementById("signOut")

if(localStorage.getItem("userData")==null){
    var dataList=[];
}else{
    dataList = JSON.parse(localStorage.getItem("userData"));
}

signUp.addEventListener("click",function(){
    signIn.classList.replace("d-none","d-block")
    userName.classList.replace("d-none","d-block")
    signUp.classList.add("d-none")
    note.classList.replace("d-block","d-none")
    login.innerHTML="Sign Up"
    clear();
    login.value=1
})

signIn.addEventListener("click",function(){
    signUp.classList.remove("d-none")
    userName.classList.replace("d-block","d-none")
    signIn.classList.add("d-none")
    note.classList.replace("d-block","d-none")
    login.innerHTML="Login"
    clear();
    login.value=0
})

login.addEventListener("click",function(){
    if (login.value == 1){
        if(userName.value == "" || userEmail.value == "" || userPassword.value == ""){
            note.innerHTML = "Please Enter Your Data"
            note.classList.replace("d-none","d-block")
            note.classList.replace("text-success","text-danger")
            note.style.fontSize="18px"
        }else if (existEmail()){
            note.innerHTML = "Email already exist"
            note.classList.replace("d-none","d-block")
            note.classList.replace("text-success","text-danger")
            note.style.fontSize="18px"
        }else{
            var person={
                name: userName.value,
                email: email.value,
                password: password.value,
            }
            dataList.push(person);
            localStorage.setItem("userData",JSON.stringify(dataList))
            note.innerHTML = "Successful"
            note.classList.replace("d-none","d-block")
            note.classList.replace("text-danger","text-success")
            note.style.fontSize="18px"
            console.log(dataList)
            clear();
        }
    }else if(login.value==0){
        if(logIn()){
            userEmail.classList.add("d-none")
            userPassword.classList.add("d-none")
            login.classList.add("d-none")
            signIn.classList.replace("d-block","d-none")
            signUp.classList.add("d-none")
            note.innerHTML = `Welcome  ${JSON.parse(localStorage.getItem("name"))}`
            note.classList.replace("d-none","d-block")
            note.classList.replace("text-danger","text-white")
            note.style.fontSize="24px"
            document.querySelector("nav").classList.replace("d-none","d-block")
        }else if (userEmail.value == "" || userPassword.value == ""){
            note.classList.replace("d-none","d-block")
            note.innerHTML="Please Enter you Email and Password"
        }else{
            note.classList.replace("d-none","d-block")
            note.style.fontSize="18px"
            note.innerHTML="Please Sign Up"
        }
    }
})

signOut.addEventListener("click",function(){
    userEmail.classList.remove("d-none")
    userPassword.classList.remove("d-none")
    login.classList.remove("d-none")
    signIn.classList.replace("d-block","d-none")
    signUp.classList.remove("d-none")
    note.classList.replace("d-block","d-none")
    note.classList.replace("text-white","text-danger")
    note.style.fontSize="18px"
    document.querySelector("nav").classList.replace("d-block","d-none")
    clear();
})

function clear(){
    userName.value = "";
    email.value = "";
    password.value = "";
}

function existEmail(){
    for (var i = 0 ; i < dataList.length ; i++){
        if(dataList[i].email == userEmail.value){
            return true;
        }else{ 
            return false;
        }
    }
}

function logIn(){
    for (var i = 0 ; i < dataList.length ; i++){
        if(dataList[i].email == userEmail.value && dataList[i].password == userPassword.value){ 
            var nameDisplay = dataList[i].name
            localStorage.setItem("name",JSON.stringify(nameDisplay))
            return true;
        }
    }
}