const loadPhones = async (searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}
const displayPhones = (phones,dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-5 shadow-lg">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pheneDetaiModal">Show details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}

const processSecrch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){

    processSecrch(10);

})
document.getElementById('search-field').addEventListener('keypress', function onEvent(e){

    if (e.key === "Enter") {
       processSecrch(10);
    }
});

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
}
else{
    loaderSection.classList.add('d-none');
}
}

// button
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSecrch();
})
const loadPhoneDetails =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPheneDetails(data.data);
}
const displayPheneDetails = phone =>{
    console.log(phone)
    const ModalLabelTitle = document.getElementById('pheneDetaiModalLabel');
    ModalLabelTitle.innerText = phone.name;
    const phoneDetailes = document.getElementById('phone-detailes');
    phoneDetailes.innerHTML = `
    <p>Release Date:${phone.releaseDate ? phone.releaseDate :'No Release Date Found'}</p>
    <img src="${phone.image}" alt="">
    `;
}
loadPhones();