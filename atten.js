let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];
const ADMIN_PASSWORD = "admin123";

function save(){
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("attendance", JSON.stringify(attendance));
}

/* LOGIN */
function login(){
    if(adminPassword.value === ADMIN_PASSWORD){
        window.location.href = "home.html";
    }else{
        alert("Wrong Password");
    }
}

/* REGISTER */
function addStudent(){
    if(!studentID.value || !studentName.value || !studentDept.value || !studentYear.value){
        alert("Fill all fields");
        return;
    }
    students.push({
        id:studentID.value,
        name:studentName.value,
        dept:studentDept.value,
        year:studentYear.value
    });
    save();
    alert("Student Added");
}

/* ATTENDANCE */
function loadAttendance(){
    let tbody = document.getElementById("attendanceBody");
    tbody.innerHTML="";
    students
    .filter(s=>s.dept===filterDept.value && s.year===filterYear.value)
    .forEach(s=>{
        tbody.innerHTML+=`
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>
                <label><input type="radio" name="${s.id}" onclick="mark('${s.id}','P')"> Present</label>
                <label><input type="radio" name="${s.id}" onclick="mark('${s.id}','A')"> Absent</label>
            </td>
        </tr>`;
    });
}

function mark(id,status){
    attendance.push({id,status});
    save();
}

/* REPORT */
function generateReport(){
    let tbody=document.getElementById("reportBody");
    tbody.innerHTML="";
    students.forEach(s=>{
        let p=attendance.filter(a=>a.id===s.id && a.status==="P").length;
        tbody.innerHTML+=`
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${p}</td>
            <td>${p}</td>
            <td>${1-p}</td>
            <td>${p?100:0}%</td>
        </tr>`;
    });
}
