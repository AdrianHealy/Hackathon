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
