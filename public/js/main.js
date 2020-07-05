$(document).ready(function () {

  listCategorias = document.getElementById('list-categorias');
  listCategoriasTab = document.getElementById('nav-tabContent');

  fetch('https://xoxo-test.herokuapp.com/api/categoria') // Call the fetch function passing the url of the API as a parameter
    .then(res => {
      return res.json();
    })
    .then(data => {
      menuCategorias(data);
    })
    .catch(err => {
      console.log(err)
    });
});
function cargarArticulos(el) {
  var template = ``;
  fetch('https://xoxo-test.herokuapp.com/api/articulo') // Call the fetch function passing the url of the API as a parameter
    .then(res => {
      return res.json();
    })
    .then(data => {
      var categoria = document.getElementById(`list-${el.nombre.toLowerCase()}`);
      let articulo = `<div class='row mx-auto py-4'>`;
      data.filter(x => x.categoriumId === el.id).forEach(element => {
        articulo += `<div class='col-sm col-md-4'><div class="card mb-3" style="max-width: 20rem;">
        <img src="${element.imagen}" class="card-img-top img-fluid" style="height: 250px;width: 100% !important;display: block;">
        <div class="card-body">
          <div class='d-flex justify-content-between'>
            <div>
            <h5 class="card-title">${element.codigo}</h5>
            <p class='card-text'>${element.nombre}</p>
            </div>
            <div class='d-flex justify-content-center align-items-center'>
            <p class='precio'>${element.precio} Bs</p></div>
          </div>        
        </div>
        <a href="#" class="btn btn-block btn-success">Contáctanos <i class="fab fa-whatsapp"></i></a>
        </div></div>`
      });
      categoria.innerHTML = articulo + '</div>'
    })
    .catch(err => {
      console.log(err)
    });
}
function menuCategorias(data) {
  let list = '';
  let listTab = '';
  let count = 0;
  data.filter(x => x.estado === true).forEach(element => {
    list += `<a class="list-group-item list-group-item-action bg-dark ${count === 0 ? "active" : ""}" 
        id="list-${element.nombre.toLowerCase()}-list" data-toggle="list" 
        href="#list-${element.nombre.toLowerCase()}" 
        role="tab" aria-controls="${element.nombre.toLowerCase()}">${element.nombre}</a>`;
    listTab += `<div class="tab-pane fade ${count === 0 ? "show active" : ""}" 
        id="list-${element.nombre.toLowerCase()}" 
        role="tabpanel" aria-labelledby="list-${element.nombre.toLowerCase()}-list">        
        ${ cargarArticulos(element)}   
        </div>`
    count++;
  });
  listCategorias.innerHTML = list;
  listCategoriasTab.innerHTML = listTab;
}