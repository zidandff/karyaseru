const navbar = document.querySelector(".navbar")

document.addEventListener('scroll', ()=> {
    if( pageYOffset > 80 ){
        navbar.classList.add("scroll")
    }else {
        navbar.classList.remove("scroll")
    }
})
const navToggler = document.querySelector(".navbar-toggler");
navToggler.addEventListener('click', ()=> {
    navbar.classList.add("scroll")
    navToggler.classList.toggle("active")
})

const navLinks = document.querySelectorAll('.nav-link')
const section = navLinks.forEach((target)=> {
    target.addEventListener('click', function(){
        return this.getAttribute("href");
    })
})

// filter kategori karya
const karyaCards = document.querySelectorAll(".card-karya")
const containerKarya = document.querySelector(".container-karya")

const btnFilter = document.querySelectorAll(".kategori")
btnFilter.forEach( btn => {
    btn.addEventListener("click", function(){
        // ubah style ke filter yang aktif
        btnFilter.forEach( btn => btn.classList.remove("filter-active") )
        this.classList.add("filter-active")

        const strKategori = this.dataset.filter
        const filtered = Array.from(karyaCards)
            .filter( card => {
                if(strKategori == "all"){
                    return card
                }
                else {
                    return card.dataset.kategori == strKategori
                }
            })
            .map( card => card.outerHTML )

        containerKarya.innerHTML = filtered.join("")
    })
} )




// AOS Initialization
AOS.init({
    offset: 120,
    mirror: true,
    duration: 1000,
    easing: 'ease-in-out-back'
});

// Smooth scroll initialization
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    easing: 'easeInOutCubic',
    offset: function(){
        if(section == "#home"){
            return 0
        }else {
            return 120
        }
    }
});