let courseNameEl = document.querySelectorAll(".course");
let courseImg = document.querySelectorAll(".courseImg");
let courseTeacher = document.getElementById("teacher");
let TeacherImage = document.getElementById("imgTeacher");
let description = document.getElementById("discription");
let ass = document.getElementById("ass");
let Video = document.getElementById("video");
let part = document.getElementById("part");
let CheckEmail = document.getElementById("CheckEmail");
let CheckPass = document.getElementById("CheckPass");
let firstName = document.getElementById("firstName");
let LastName = document.getElementById("LastName");
let AddEmail = document.getElementById("AddEmail");
let AddPass = document.getElementById("AddPass");
let courseInd = 0;

function addUser() {
  if (
    firstName.value !== "" &&
    LastName.value !== "" &&
    AddEmail.value !== "" &&
    AddPass.value !== ""
  ) {
    Users.push({
      firstname: firstName.value,
      lastname: LastName.value,
      email: AddEmail.value,
      pass: AddPass.value,
    });
    sessionStorage.setItem("users", JSON.stringify(Users));
    sessionStorage.setItem("user", JSON.stringify(AddEmail.value));
    firstName.value = "";
    LastName.value = "";
    AddEmail.value = "";
    AddPass.value = "";
    console.log(Users);
  } else {
    alert("All Data are Required!");
  }
}
function checkInfo() {
  if (CheckEmail.value !== "" && CheckPass.value !== "") {
    console.log(CheckEmail.value, CheckPass.value);
    const isAdmin = Admin.some(
      (user) =>
        user.email === CheckEmail.value && user.password === CheckPass.value
    );
    console.log(isAdmin);
    if (isAdmin) {
      window.location.href = "../admin.html";
    } else {
      let sessionStorageUsers = sessionStorage.getItem("users");
      let users = sessionStorageUsers ? JSON.parse(sessionStorageUsers) : Users;
      console.log(users[0]);
      const isUser = users.some(
        (user) =>
          user.email === CheckEmail.value && user.pass === CheckPass.value
      );
      console.log(isUser);
      if (isUser) {
        sessionStorage.setItem("Showing", JSON.stringify(true));
        window.location.href = "../Courses.html";
      } else {
        alert("Email or Password is incorrect");
      }
    }
  } else alert("Email and Password are both required!");
}
function gotoCourse(num) {
  courseInd = num;
  document.querySelector(".coursesBody").style.display = "none";
  document.querySelector(".playlistBody").style.display = "block";
  ass.innerHTML = Courses[courseInd].assignment;
  TeacherImage.src = Courses[courseInd].teacherImg;
  courseTeacher.innerHTML = Courses[courseInd].teacher;
  description.innerHTML = Courses[courseInd].discription;
  courseImg.forEach((img) => (img.src = Courses[courseInd].img));
  courseNameEl.forEach((el) => (el.innerHTML = Courses[courseInd].name));

  let IsLogin = JSON.parse(sessionStorage.getItem("Showing"));
  console.log(IsLogin);
  if (IsLogin === true) {
    document.querySelector(".ass").style.display = "block";
  } else {
    document.querySelector(".ass").style.display = "none";
  }
}
function gotoVideo(num) {
  event.preventDefault();
  document.querySelector(".playlistBody").style.display = "none";
  document.querySelector(".videoBody").style.display = "block";
  Video.src = Courses[courseInd].video;
  part.innerHTML = num;
}

let Assignment = [];
function addAss() {
  if (
    document.getElementById("stuName").value !== "" &&
    document.getElementById("file").value !== "" &&
    document.getElementById("courseName").value !== ""
  ) {
    const newElement = {
      StudentName: document.getElementById("stuName").value,
      AssignmentFile: document.getElementById("file").value,
      CourseName: document.getElementById("courseName").value,
    };
    console.log(newElement.StudentName);
    Assignment.push(newElement);
    document.getElementById("stuName").value = "";
    document.getElementById("file").value = "";
    document.getElementById("courseName").value = "";
    document.querySelector(".sucess").style.display = "block";
    setTimeout(() => {
      document.querySelector(".sucess").style.display = "none";
      const index = localStorage.length;
      localStorage.setItem(`Assignment[${index}]`, JSON.stringify(newElement));
      console.log(JSON.parse(localStorage.getItem(`Assignment[${index}]`)));
    }, 2000);
  } else {
    alert("Student Name, File, and Course Name are all required!");
  }
  console.log(Assignment);
}
function showTable() {
  const table = document.getElementById("assTable");
  let data = [];
  while (table.rows.length > 1) {
    table.deleteRow(-1);
  }
  for (let j = 0; j < localStorage.length; j++) {
    const key = localStorage.key(j);

    if (key.includes("Assignment[")) {
      try {
        const element = JSON.parse(localStorage.getItem(key));
        data.push(element);

        let trEl = `
          <tr>
            <td>${element.StudentName}</td>
            <td>${element.CourseName}</td>
            <td><a>${element.AssignmentFile}</a></td>
          </tr>
        `;
        table.insertAdjacentHTML("beforeend", trEl);
      } catch (error) {
        console.error(`Error parsing JSON for ${key}: ${error}`);
      }
    }
  }
  table.style.display = "table";
}
var barChartOptions = {
  series: [
    {
      data: [12, 10, 8, 6, 4, 2],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#cc3c43", "#246dec", "#f5b74f", "#4f35a1", "#367952", "#246dec"],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["HTML", "CSS", "JS", "Bootstrap", "Node js", "JQuery"],
  },
  yaxis: {
    title: {
      text: "Watches",
    },
  },
};

var barChart = new ApexCharts(
  document.querySelector("#barChart"),
  barChartOptions
);
barChart.render();

var areaChartOptions = {
  series: [
    {
      name: "This Year",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Last Year",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#367952", "#f5b74f"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Last Year",
      },
    },
    {
      opposite: true,
      title: {
        text: "This Year",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};
var areaChart = new ApexCharts(
  document.querySelector("#areaChart"),
  areaChartOptions
);
areaChart.render();