const addLoader = () => {
    const main = document.querySelector('main');
    main.querySelectorAll('*').forEach(n => n.remove());
    main.innerHTML = '<div class="loader"></div>';
}

export { addLoader };