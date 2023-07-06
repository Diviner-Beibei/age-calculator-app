const inputDay = document.querySelector("#day-input");
const inputMonth = document.querySelector("#month-input");
const inputYear = document.querySelector("#year-input");

const outYear = document.querySelector(".out-year");
const outMonth = document.querySelector(".out-month");
const outDay = document.querySelector(".out-day");

const calBtn = document.querySelector(".cal-btn");

const STYLE_DEFAULT_COLOR = inputDay.closest('.form-group').firstElementChild.style.color;
const STYLE_DEFAULT_BORDER = inputDay.style.border;

calBtn.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(inputDay.value, inputMonth.value, inputYear.value);

  let inputError = false;

  if (inputDay.value.length === 0) inputError = dispatch(inputDay, "empty");
  else dispatch(inputDay, "hidden");
  if (inputMonth.value.length === 0) inputError = dispatch(inputMonth, "empty");
  else dispatch(inputMonth, "hidden");
  if (inputYear.value.length === 0) inputError = dispatch(inputYear, "empty");
  else dispatch(inputYear, "hidden");
  if (inputError) return;

  if (!(/\d/g.test(inputDay.value))) inputError = dispatch(inputDay, "invalid", "Must be a valid day");
  if (!(/\d/g.test(inputMonth.value))) inputError = dispatch(inputMonth, "invalid", "Must be a valid month");
  if (!(/\d/g.test(inputYear.value))) inputError = dispatch(inputYear, "invalid", "Must be a valid year");

  // console.log(/\d/g.test("21"));
  // console.log(typeof inputMonth.value);

  if (inputError) return;
  const future = new Date();
  outDay.textContent = inputDay.value;
  outMonth.textContent = inputMonth.value;
  outYear.textContent = Number(future.getFullYear()) - Number(inputYear.value);

  // console.log(future.getDate(), future.getMonth() + 1, Number(future.getFullYear()) - Number(inputYear.value));

  dispatch(inputDay, "hidden");
  dispatch(inputMonth, "hidden");
  dispatch(inputYear, "hidden");
})

function dispatch(dom, action, hintText) {

  const label = dom.closest('.form-group').firstElementChild;
  const hint = dom.closest('.form-group').lastElementChild;

  if (action === "invalid" || action === "empty") {
    dom.style.border = '1px solid hsl(4, 100%, 67%)';
    label.style.color = 'hsl(4, 100%, 67%)';
    hint.style.display = 'block';
  }

  if (action === "empty") {
    hint.textContent = "This field is required";
    console.log("-------");
  }

  if (action === "invalid") {
    hint.textContent = `${hintText}`;
  }

  if (action === "hidden") {
    dom.style.border = STYLE_DEFAULT_BORDER;
    label.style.color = STYLE_DEFAULT_COLOR;
    hint.style.display = 'none';
  }

  return true;
}