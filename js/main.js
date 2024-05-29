let siteName = document.getElementById('siteName')
let siteUrl = document.getElementById('siteUrl')
let btnSubmit = document.getElementById('btnSubmit')
let btnUpdate = document.getElementById('btnUpdate')
let array = []

if(localStorage.getItem('siteDate')){
  array = JSON.parse(localStorage.getItem('siteDate'))
  displaySiteDate(array)
}

function addSiteDate() {
  if (validate(x)&&validate(y)) {
    let siteDate = {
      name: siteName.value,
      url: siteUrl.value,
    }
    array.push(siteDate)
    displaySiteDate(array)
    localStorage.setItem('siteDate', JSON.stringify(array))
    clearDate()
    x.classList.remove('is-valid')
    y.classList.remove('is-valid')
  }
  else{
    document.getElementById('wrong').classList.remove("d-none")
  }
}

function displaySiteDate(arr){
  let site=``
  for (let i = 0; i < arr.length; i++) {
    site+=`
    <tr>
    <td class="p-2">${i+1}</td>
    <td class="p-2 fw-">${arr[i].name}</td>
    <td class="p-2">
      <a href="${arr[i].url.includes("https://"||"http://")?arr[i].url:`https://${arr[i].url}`}" target="_blank">
        <button class="btn btn-success text-white">
          <i class="fa-solid fa-eye me-1"></i> Visit
        </button>
      </a>
    </td>
    <td class="p-2">
      <button onclick="changeData(${i})" class="text-white btn-secondary btn">
      <i class="fa-solid fa-pen"></i>
        Update
        </button>
    </td>
    <td class="p-2">
      <button onclick="deleteDate(${i})" class="btn btn-danger text-white">
        <i class="fa-solid fa-trash-can me-1"></i>
        Delete
        </button>
    </td>
    </td>
  </tr>
    `
  }
  document.getElementById('tableDate').innerHTML= site
}
function clearDate() {
  siteName.value=''
  siteUrl.value=''
}

function deleteDate(index) {
  array.splice(index, 1)
  localStorage.setItem('siteDate', JSON.stringify(array))
  displaySiteDate(array)
}

function changeData(index) {
  objectIndex = index
  siteName.value = array[index].name
  siteUrl.value = array[index].url
  btnUpdate.classList.remove("d-none")
  btnSubmit.classList.add("d-none")
}
function updateNewData() {
  if (validate(x)&&validate(y)) {
    array[objectIndex].name =  siteName.value
array[objectIndex].url = siteUrl.value
btnUpdate.classList.add("d-none")
btnSubmit.classList.remove("d-none")
displaySiteDate(array)
localStorage.setItem('siteDate', JSON.stringify(array))
clearDate()
  }else{
    document.getElementById('wrong').classList.remove("d-none")
  }
}
function search(searchKey) {
  let searchResult= []
  for (i = 0; i < array.length; i++) {
    if (array[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
      searchResult.push(array[i])
    }
  }
  displaySiteDate(searchResult)
}
let x = document.querySelector('input.siteName');
let y = document.querySelector('input.siteUrl');
  x.addEventListener("input", function(e) {
    validate(e.target)
  })
  y.addEventListener("input", function(e) {
    validate(e.target)
  })
  let validates = {
    siteName : /\w{3,}(\s+\w+)*$/,
    siteUrl : /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  }
function validate(date) {
  if (validates[date.id].test(date.value)) {
    date.classList.replace('is-invalid' , 'is-valid')
    return true
  }else{
    date.classList.add('is-invalid')
    return false
  }
} 
function closeDivWrong() {
  document.getElementById("wrong").classList.add('d-none')
}
document.addEventListener("click", function (e) {
  if(e.target.id === "wrong"){
    e.target.classList.add("d-none")
  }
})
document.addEventListener("keydown", function (e){
  if (e.key === "Escape") {
  document.getElementById("wrong").classList.add('d-none')
  }
})