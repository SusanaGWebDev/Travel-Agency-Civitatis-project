//Estudiantes iniciales del sistema

var listaProductos =
[
    ['Susana Gonzalez','susana@gmail.com', '2', '26-11-2021', 'Senderismo Rio Celeste'],
    
];




function AgregarProducto(){

    //lee los datos ingresados
    var sNombre_Completo = document.querySelector('#txtNomC').value;
    var sEmail = document.querySelector('#txtEmail').value;
    var sCantidad_Personas = document.querySelector('#txtCantidadP').value;
    var sFecha_Reservacion = document.querySelector('#txtFechaR').value;
    var sTour = document.querySelector('#txtTour').value;
    
    //valida que todos los datos esten llenos
       var aNuevoProducto = [];
       aNuevoProducto.push(sNombre_Completo,sEmail, sCantidad_Personas, sFecha_Reservacion, sTour); //agrega los datos al array

       var listaProductos = getListaProductos();
       listaProductos.push(aNuevoProducto);
       localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
        alert("Reservacion completada con exito");
       CargarTablaProductos();
    
}




//Obtener Lista de Estudiantes
function getListaProductos(){
    var listaProductosLocal = JSON.parse(localStorage.getItem('listaProductosLS'));

    if(listaProductosLocal == null){
        listaProductosLocal = listaProductos;
    }

    return listaProductosLocal;
}

//Carga la tabla de citas
function CargarTablaProductos(){

    var producto = getListaProductos(),
    tbody = document.querySelector('#tblPersonas2 tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < producto.length; i++) {
        
        var fila              = document.createElement('tr'),
            celdaNombre_Completo       = document.createElement('td'),
            celdaEmail       = document.createElement('td'),
            celdaCantidad_Personas       = document.createElement('td'),
            celdaFecha_Reservacion    = document.createElement('td'),
            celdaTour         = document.createElement('td');
            celdaOpciones     = document.createElement('td');

        var botonEditar           = document.createElement('input');
            botonEditar.type      = 'button';
            botonEditar.id        = producto[i][0];
            botonEditar.classList = 'Opciones';
            botonEditar.style     = 'background-image: url("./img/mod.png"); width:36px; height:36px';
            botonEditar.addEventListener('click', Modal);
            

        var botonEliminar           = document.createElement('input');
            botonEliminar.type      = 'button';
            botonEliminar.id        = producto[i][0];
            botonEliminar.classList = 'Opciones';
            botonEliminar.style     ='background-image: url("./img/trash.png"); width:36px; height:36px';
            botonEliminar.addEventListener('click', EliminarProducto);

        celdaNombre_Completo.innerHTML        = producto[i][0];
        celdaEmail.innerHTML        = producto[i][1];
        celdaCantidad_Personas.innerHTML         = producto[i][2];
        celdaFecha_Reservacion.innerHTML      = producto[i][3];
        celdaTour.innerHTML          = producto[i][4];

        celdaOpciones.appendChild(botonEditar);
        celdaOpciones.appendChild(botonEliminar);

        fila.appendChild(celdaNombre_Completo);
        fila.appendChild(celdaEmail);
        fila.appendChild(celdaCantidad_Personas);
        fila.appendChild(celdaFecha_Reservacion);
        fila.appendChild(celdaTour);
        fila.appendChild(celdaOpciones);

        tbody.appendChild(fila);
    }
}

//Eliminar Estudiantes
function EliminarProducto(){
    var producto;
    var listaProductos = getListaProductos();
    
    for (var i = 0; i < listaProductos.length; i++) {
        if (this.id == listaProductos[i][0]) {
            producto = listaProductos[i]; //obtiene los datos del estudiante seleccionado
        }
    }

    var index = listaProductos.indexOf(producto); //obtiene la posición de los datos del estudiante seleccionado

    if (index > -1) {
        listaProductos.splice(index, 1); //elimina al estudiante
    }

    localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
    alert("Reserva eliminada correctamente");
    CargarTablaProductos();
}

//Busca a un estudiante específico
function BuscarProducto(IdProducto){

    var producto;
    var listaProductos = getListaProductos();

    console.log(listaProductos);

    for (var i = 0; i < listaProductos.length; i++) {
        if (IdProducto == listaProductos[i][0]) {
            producto = listaProductos[i]; //obtiene los datos del estudiante seleccionado
        }
    }
    return producto;
}

function Modal(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn  = document.getElementById(this.id);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    CargarProductos(this.id);
}

function CargarProductos(IdProducto){

    var producto = BuscarProducto(IdProducto);

    document.querySelector('#txtNomCMod').value      = producto[0];
    document.querySelector('#txtEmailMod').value      = producto[1];
    document.querySelector('#txtCantidadPMod').value    = producto[2];
    document.querySelector('#txtFechaRMod').value = producto[3];
    document.querySelector('#txtTourMod').value     = producto[4];

}

function EditarProducto(IdProducto){
    var productoOriginal;
    var producto = BuscarProducto(IdProducto);

    //lee los datos ingresados
    var sNombre_Completo      = document.querySelector('#txtNomCMod').value;
    var sEmail      = document.querySelector('#txtEmailMod').value;
    var sCantidad_Personas       = document.querySelector('#txtCantidadPMod').value;
    var sFecha_Reservacion    = document.querySelector('#txtFechaRMod').value;
    var sTour        = document.querySelector('#txtTourMod').value;


        producto[0] = sNombre_Completo;
        producto[1] = sEmail;
        producto[2] = sCantidad_Personas;
        producto[3] = sFecha_Reservacion;
        producto[4] = sTour;

        var listaProductos = getListaProductos();
    
        for (var i = 0; i < listaProductos.length; i++) {
            if (IdProducto == listaProductos[i][0]) {
                productoOriginal = listaProductos[i]; //obtiene los datos del estudiante seleccionado
            }
        }
    
        var index = listaProductos.indexOf(productoOriginal); //obtiene la posición de los datos del estudiante seleccionado
    
        if (index > -1) {
            listaProductos[index] = producto; //elimina al estudiante
        }
    
        localStorage.setItem('listaProductosLS', JSON.stringify(listaProductos));//agrega el array a una variable de sesion
    
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        alert("Reserva modificada correctamente");
    


    

    CargarTablaProductos();    
}