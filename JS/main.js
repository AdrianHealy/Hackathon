const API = "http://localhost:3000/students";

let inpName = $(".inp-name");
let inpSecond = $(".inp-lastname");
let inpNum = $(".inp-number");
let inpWeek = $(".inp-week");
let inpMounth = $(".inp-mounth");
let addForm = $(".add-form");

async function addStudent(event) {
  event.preventDeafauld();
  let nameVal = inpName.val().trim();
  let lastnameVal = inpSecond.val().trim();
  let numVal = parseInt(inpVal.val().trim());
  let inpweekVal = parseInt(inpWeek.val().trim());
  let inpmounthVal = parseInt(inpMounth.val().trim());

  let newStudent = {
    name: nameVal,
    lastname: lastnameVal,
    number: numVal,
    kpiw: inpweekVal,
    kpim: inpmounthVal,
  };
  for (let key in newStudent) {
    if (!newStudent[key]) {
      alert("Что серьёзно?");
      return;
    }
  }
  try {
    const response = await axios.post(API, newStudent);
  } catch (error) {
    console.log(error);
  }
  inpName.val("");
  inpSecond.val("");
  inpNum.val("");
  inpWeek.val("");
  inpMounth.val("");
}
addForm.on("submit", addStudent);

let studentName = $(".student-name");
let student = [];

async function getStudents(URL) {
  try {
    const response = await axios(URL);
    student = response.data;
    // Чтобы отобразить полученные товары
    // render(student);

    handlePagination(); //!
  } catch (error) {
    console.log(error);
  }
}
//!
function render(student) {
  // Очищает блок, чтобы не дублировать контент
  studentName.html("");
  // Очищает блок чтобы не дублировать контент
  student.forEach((item) => {
    studentName.append(`
      <div class="card" style="width: 18rem; " >
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h6>${item.lastname}</h6>
      <p class="card-text">${item.year}</p>
      <h6>Недельный KPI: ${item.kpiw}</h6>
      <h6>KPI за месяц: ${item.kpim}</h6>
      <a href="#" class="btn btn-primary">Подробнее..</a>
      <button class ="btn-delete" id="${item.id}"><img src = "https://cdn-icons.flaticon.com/png/512/484/premium/484611.png?token=exp=1640168191~hmac=d0eec1cf6a6bb8f863c6f165569e6e65"></button>
      <button  data-bs-toggle="modal" data-bs-target="#exampleModal" class = "btn-edite" id = "${item.id}"><img src = "https://cdn-icons-png.flaticon.com/128/61/61456.png"></button>
      
          </div>
      </div>
            `);
  });
}
getStudents(API);

//!

//! Удалеение

async function deleteStudent(event) {
  let id = event.currentTarget.id;
  try {
    await axios.delete(`${API}/${id}`);
    alert("Успешно удалено");
    getStudents(API);
  } catch (error) {
    console.log(error);
  }
}
$(document).on("click", ".btn-delete", deleteStudent);

//!

//! UPDATE part№1

let editInpName = $(".edit-inp-name");
let editInpLastName = $(".edit-inp-lastname");
let editInpNumber = $(".edit-inp-number");
let editInpKpiw = $(".edit-inp-kpiw");
let editInpKpim = $(".edit-inp-kpim");
let editInpImage = $(".edit-inp-image");
let editForm = $(".edit-form");

async function getStudentToEdite(event) {
  let id = event.currentTarget.id;
  try {
    const response = await axios(`${API}/${id}`);
    editInpName.val(response.data.name);
    editInpLastName.val(response.data.lastname);
    editInpNumber.val(response.data.number);
    editInpKpiw.val(response.data.kpiw);
    editInpKpim.val(response.data.kpim);
    editInpImage.val(response.data.image);

    editForm.attr("id", id);
    //console.log(response);
  } catch (error) {
    console.log(error);
  }
}

$(document).on("click", ".btn-edite", getStudentToEdite);

//! UPDATE part№2

async function saveEditeStudent(event) {
  event.preventDefault();
  let id = event.currentTarget.id;

  let editedStudent = {
    name: editInpName.val().trim(),
    lastname: editInpLastName.val().trim(),
    number: editInpNumber.val().trim(),
    kpiw: editInpKpiw.val().trim(),
    kpim: editInpKpim.val().trim(),
    image: editInpImage.val().trim(),
  };
  for (let key in editedStudent) {
    if (!editedStudent[key]) {
      alert("Что серьезно?");
      return;
    }
  }
  try {
    await axios.patch(`${API}/${id}`, editedStudent);
    alert("Всё ОК");
    getStudents(API);
    $(".modal").modal("hide");
  } catch (error) {
    console.log(error);
  }
}
editForm.on("submit", saveEditeStudent);
//!

//! Пагинация

let pagination = $(".pagination");
const studentPerPage = 6;
let currentPage = 1;
let pagesCount = 1;

function handlePagination() {
  let indexOfLastStudent = currentPage * studentPerPage;
  let indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  let currentStudent = student.slice(indexOfFirstStudent, indexOfLastStudent);
  render(currentStudent);
  pagesCount = Math.ceil(student.length / studentPerPage);
  addPagination(pagesCount);
}
function addPagination(pagesCount) {
  pagination.html("");
  for (let i = 1; i <= pagesCount; i++) {
    console.log(pagesCount);
    pagination.append(`
        <li class="page-item ${currentPage === i ? "active" : ""}">
           <a class="page-link pagination-item" href="#">${i}</a>
        </li>
        `);
  }
}
$(document).on("click", ".pagination-item", (event) => {
  let newPage = event.target.innerText;
  currentPage = +newPage;
  handlePagination();
});

//! Поиск

let searchInp = $(".search-inp");
async function liveSearch(event) {
  let value = event.target.value;
  try {
    const response = await axios(`${API}?q=${value}`);
    student = response.data;
    currentPage = 1;
    handlePagination();
  } catch (error) {
    console.log(error);
  }
}
searchInp.on("input", liveSearch);

//!
