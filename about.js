console.log("Lets Introduce Yourself")

let first = document.querySelector(".first")
let second = document.querySelector(".Second")
console.log(second);

setInterval(() => {
    first.classList.add("hide")
    second.classList.remove("hide")
}, 3000);
setInterval(() => {
    second.classList.add("hide")
    first.classList.remove("hide")
}, 6000);
let reveal = document.querySelector(".texts")
reveal.addEventListener("click", (e) => {
    let btn = e.target.closest(".btn")
    let h2 = btn.getElementsByTagName("h2")[0]
    let img = btn.getElementsByTagName("img")[0]
    btn.style.width = "95%";
    if (e.target.closest(".name")) {
        h2.textContent = "Manish Vaishnav"
        img.style.display = "none"
    }
    if (e.target.closest(".email")) {
        img.style.display = "none"
        h2.innerHTML = `<a href = "mailto:vaishnavmanish707@gmail.com">Vaishnavmanish707@gmail.com</a>`
    }
    if (e.target.closest(".contact")) {
        img.style.display = "none"
        h2.textContent = "Mo.9521278385"
    }
})

let change = document.querySelector(".footer")
let border = document.querySelector(".identiy")
console.log(border);

let container = document.querySelector(".container")
change.addEventListener("click",(e)=>{
    if(e.target.closest(".javascript")){
        container.style.backgroundColor = "yellow" 
        border.style.border = "1px solid yellow"
    }
    if(e.target.closest(".css")){
        container.style.backgroundColor = "rgb(36,145,205)"
        border.style.border = "1px solid rgb(36,145,205)"
    }
    if(e.target.closest(".html")){
        container.style.backgroundColor ="rgb(246, 126, 97)"
        border.style.border = "1px solid rgb(246, 126, 97)"
    }
})
