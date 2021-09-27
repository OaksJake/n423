var students = [];
let studentName;
let age;
let phone;
let email;
let classArray = [];
let i = 0;
let check;
let text = '';
let s = 0;

function initListener() {
    $("#submit").click(function (e) {
        e.preventDefault();
        studentName = $("#name").val();
        age = $("#age").val();
        phone = $("#phone").val();
        email = $("#email").val();
        classArray = [];
        for(let j = 1; j < i; j++) {
            classArray.push($(`#class${j}`).val());
        }
        let stuObj = { name: studentName, age: age, phone: phone, email: email, classes: classArray};
        students.push(stuObj);
        localStorage.setItem("students", JSON.stringify(students));

        $("#name").val("");
        $("#age").val("");
        $("#phone").val("");
        $("#email").val("");
        $("#classes").val("");
        for(let k = 1; k < i; k++) {
            $(`.class${k}`).remove();
        }
    })
}

function classCount() {
    $("#classSubmit").click(function (e) {
        for(let k = 1; k < i; k++) {
            $(`.class${k}`).remove();
        }
        e.preventDefault();
        let num = $("#classes").val();
        for(i = 1; i <= num; i++) {
            $("#classList").append(`<div class="longInput">
            <label class="class${i}" for="class${i}">Class:</label>
            <input class="class${i}" id="class${i}" type="text"/>
            </div>`);
        }
    })
}

function studentRoaster() {
    $("#roaster").click(function (e) {
        e.preventDefault();
        $("#studentInfo").html("");
        if(localStorage) {
            console.log("Local Storagae available");
            let local = JSON.parse(localStorage.getItem('students'));
            s = local.length;
            console.log(local);
            for(let k = 0; k < s; k++) {
                let f = 0;
                $("#studentInfo").append(`<div id="contentid">Name: ${local[k].name} | Age: ${local[k].age} | Phone: ${local[k].phone} | E-mail: ${local[k].email} | Classes: 
                ${local[k].classes.map(function (data) {
                    if(f < (local[k].classes.length - 1)) {
                        f++;
                        return data + ",";
                    }
                    else {
                        return data;
                    }
                }).join("")}</div>`);
            }
        }
        else {
            console.log("Local Storage not available");
        }
    })
}

$(document).ready(function(){
    initListener();
    classCount();
    studentRoaster();
})