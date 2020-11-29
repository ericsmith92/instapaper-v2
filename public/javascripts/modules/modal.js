const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal_btn');
const modalNoShow = document.getElementById('noshow');

function toggleModal(){
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function modifyLocalStorage(){
    if(this.checked){
        localStorage.setItem('noShow', 'true');
    }else{
        localStorage.removeItem('noShow');
    }
}

export{ modal, 
    modalCloseBtn, 
    modalNoShow, 
    toggleModal, 
    modifyLocalStorage
};