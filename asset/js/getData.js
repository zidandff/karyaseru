async function renderKarya(){
    const karya = await getDataKarya()
    updateUI(karya)
}
renderKarya()

const btnFilter = document.querySelectorAll(".kategori")
btnFilter.forEach( btn => {
    btn.addEventListener("click", async function(){
        try {
            // ubah style ke filter yang aktif
            btnFilter.forEach( btn => btn.classList.remove("filter-active") )
            this.classList.add("filter-active")
    
            const karya = await getDataKarya()
            const strKategori = this.innerText.toLowerCase()
            filterKarya(karya, strKategori)
        }
        catch(error){
            displayError(error)
        }
    })
})

function getDataKarya(){
    return fetch('/asset/resource/karya.json')
            .then(response => {
                if( !response.ok ){
                    throw new Error("Upss sepertinya web kami bermasalah, mohon tunggu")
                }
                return response.json()
            })
            .then(response => response.karya)
}

function updateUI(dataKarya){
    let cards = ""
    dataKarya.forEach(karya => cards += compCard(karya))
    const containerCard = document.querySelector('.container-karya')
    containerCard.innerHTML = cards
}

function filterKarya(dataKarya, filterText){
    
    const filtered = dataKarya.filter(data => data.category.toLowerCase() == filterText)
    if( filterText == "semua" ){
        updateUI(dataKarya)
        return
    }
    else if( filtered.length == 0 ){
        throw "404 not found"
    }
    updateUI(filtered)
}

function displayError(error){
    const containerCard = document.querySelector('.container-karya')
    containerCard.innerHTML = `<div class="col-md-6 mx-auto error-img">
        <img src="/asset/img/404.svg" class="mt-5" alt="error ${error}" width="100%">
        <h1 class="text-center">${error}</h1>
    </div>`
}

function compCard({title, creator, category, coverImage}){
    return `<div class="col-lg-4 col-md-6 my-4 card-karya">
    <div class=" border rounded-xl px-3 py-4">
        <h3 class="fs-5 fw-bold">${title}</h3>
        <p class="paragraf fs-6 mb-2">${category}</p>

        <img src="${coverImage}" class="img-karya rounded-xl" alt="">
        <div class="d-flex justify-content-between my-3">
            <p class="fw-bold">By. ${creator}</p>
            <div>
                <a href="https://instagram.com"><img src="asset/img/icon/ig.svg" class="sosmed-icon mx-1" alt=""></a>
                <a href="https://instagram.com"><img src="asset/img/icon/fb.svg" class="sosmed-icon mx-1" alt=""></a>
                <a href="https://instagram.com"><img src="asset/img/icon/twt.svg" class="sosmed-icon mx-1" alt=""></a>
            </div>
        </div>
        <a href="#" class="btn btn-red">Lihat Selengkapnya</a>
    </div>
</div>`
}