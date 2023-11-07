import simpleDatatables from "simple-datatables";

window.addEventListener('DOMContentLoaded', event => {
    console.log('DOMContentLoaded event fired!');
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        console.log('Initializing DataTable...');
        new simpleDatatables.DataTable(datatablesSimple);
    }
});
