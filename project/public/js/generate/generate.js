$(document).ready(function () {
    $(".screen").page();
    tipsInterval = setInterval(moveItem,12000);
    $('#modal_bienvenida').modal('toggle');
    $('input[date-mask]').mask('00/00/0000');
});

var tips = 
    ["Más de 1000 empresas en todo el Perú buscan un perfil como el tuyo",
    "Mejora tu perfil y tendras más oportunidades de obtener el empleo ideal",
    "Las empresas se fijan más en las experiencias obtenidas",
    "Este es un espacio exclusivamente para desarrolladores de programación como tú",
    "Puedes agregar proyectos propios o hechos en la universidad",
    "Seras más valorado por las experiencias y proyectos trabajados",
    "Puedes agregar mas experiencia cuando quieras desde tu laptop o celular",
    "Las empresas se comunicaran contigo atravez de teléfono o correo que ingreses"];

$(".tips").text(tips[0]);
var index_tip = 0;
function nextTip(){
    clearInterval(tipsInterval);
    tipsInterval = setInterval(moveItem,10000);
    if(index_tip == tips.length - 1){
        index_tip = 0;
        $(".tips").text(tips[index_tip]);
        return;
    }
    index_tip++;
    $(".tips").text(tips[index_tip]);
}

function previousTip(){
    clearInterval(tipsInterval);
    tipsInterval = setInterval(moveItem,10000);
    if(index_tip == 0){
        index_tip = tips.length - 1
        $(".tips").text(tips[index_tip]);
        return;
    }
    index_tip--;
    $(".tips").text(tips[index_tip]);
}

function validarCampos(){
    var fields = $("[mandatory]");
    $('#siguiente').prop('disabled', false);
    $.each( fields, function( key, value ) {
        if($(value).val() == "" || $(value).val() == null){
            $('#siguiente').prop('disabled', true);
        }
    });
}

var index_page = 1;
function siguiente(){
    $("#siguiente").val("Siguiente");
    if(index_page == 1){
        if(!validateEmail($("#correo").val())){
            showNotification("Correo Invalido", "Ingrese un correo valido", "error");
            return;
        }

        if($("#telefono").val().length != 9){
            showNotification("Teléfono Invalido", "Ingrese un número valido", "error");
            return;
        }
        var data = {
            nombres : $("#nombres").val(),
            apellidos : $("#apellidos").val(),
            correo : $("#correo").val(),
            telefono : $("#telefono").val(),
            departamento : $("#departamento").val(),
            distrito : $("#distrito").val()
        };
        infobasica(data);
    }else if(index_page == 2){
        if(proyectos.length == 0){
            showNotification("Faltan proyectos", "Ingrese por lo menos 1 proyecto (Universidad o de trabajo)", "error");
            return;
        }
    }else if(index_page == 3){
        if(experiencias.length == 0){
            showNotification("Un Consejo", "Si tienes experiencias laborales agregalas y has notar más tu CV", "info");
        }
        $("#siguiente").html("Terminar");
    }else if(index_page == 4){
        var skills = $("#skills").tagsinput('items');
        if(skills.length == 0){
            showNotification("Faltan skills", "Ingrese por lo menos 5 skills", "error");
            return;
        }
        var idiomas = $("#idiomas").tagsinput('items');
        if(idiomas.length == 0){
            showNotification("Faltan idiomas", "Ingrese por lo menos 1 Idioma", "error");
            return;
        }
        $('#modal_terminando').modal('toggle');
        generateCV(proyectos, experiencias, skills, idiomas, estudios);
        return;
    }
    $('#atras').prop('disabled', false);
    index_page++;
    redirectSection(index_page.toString(), "slide-in-from-right");
}

function atras(){
    $("#siguiente").html("Siguiente");
    if(index_page == 2){
        $('#atras').prop('disabled', true);
    }
    index_page--;
    redirectSection(index_page.toString(), "slide-in-from-left");
}

function redirectSection(page, trans){
    $(".screen").page().transition(page, trans);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var tipsInterval = null;
function moveItem() {
    nextTip();
}

function openAgregarProyecto(){
    id_proyecto = null;
    $("#nombre_proyecto").val("");
    $("#puesto_proyecto").val("");
    $("#fcomienzo_proyecto").val("");
    $("#fterminado_proyecto").val("");
    $("#actual_proyecto").prop('checked', false);
    $("#descripcion_proyecto").val("");
    $("#referencias_proyecto").val("");
    $('#fterminado_proyecto').prop('disabled', false);

    $('#modal_agregar_proyecto').modal('toggle');
    $('#btn_agregar_proyecto').html('Agregar');
}

function openNuevaExperiencia(){
    id_experiencia = null;
    $("#empresa_experiencia").val("");
    $("#puesto_experiencia").val("");
    $("#fingreso_experiencia").val("");
    $("#fsalida_experiencia").val("");
    $("#actual_experiencia").prop('checked', false);
    $("#herramientas_experiencia").val("");

    $('#modal_nueva_experiencia').modal('toggle');
    $('#btn_nueva_experiencia').html('Agregar');
}

function openNuevoEstudio(){
    id_estudio = null;
    $("#titulo_estudio").val("");
    $("#fecha_estudio").val("");
    $("#link_estudio").val("");

    $('#modal_nuevo_estudio').modal('toggle');
    $("#btn_nuevo_estudio").html("Agregar");
}

var proyectos = [];
$('#actual_proyecto').change(function () {
    if ($('#actual_proyecto').is(":checked")){
        $('#fterminado_proyecto').prop('disabled', true);
    }else{
        $('#fterminado_proyecto').prop('disabled', false);
    }
});

var index_proyecto = 1;
function agregarProyecto(){
    if(id_proyecto != null){
        confirmEditarProyecto();
        return;
    }
    var nombre      = $("#nombre_proyecto").val().trim();
    var puesto      = $("#puesto_proyecto").val().trim();
    var fcomienzo   = $("#fcomienzo_proyecto").val().trim();
    var fterminado  = $("#fterminado_proyecto").val().trim();
    var descripcion = $("#descripcion_proyecto").val().trim();
    var referencias = $("#referencias_proyecto").val().trim();

    if(nombre == "" || puesto == "" || fcomienzo == "" || descripcion == ""){
        if(!$('#actual_proyecto').is(":checked") && fterminado == ""){
            showNotification("Faltan campos", "Ingrese todos los campos", "error");
            return;
        }
    }

    if ($('#actual_proyecto').is(":checked")){
        fterminado = "Actual";
    }

    var id = "temp_"+index_proyecto;
    proyectos.push({
        id: id,
        nombre: nombre,
        puesto: puesto,
        fcomienzo:fcomienzo,
        fterminado:fterminado,
        descripcion:descripcion,
        referencias:referencias
    });

    $("#nombre_proyecto").val("");
    $("#puesto_proyecto").val("");
    $("#fcomienzo_proyecto").val("");
    $("#fterminado_proyecto").val("");
    $("#actual_proyecto").prop('checked', false);
    $("#descripcion_proyecto").val("");
    $("#referencias_proyecto").val("");
    $('#fterminado_proyecto').prop('disabled', false);

    var proyecto = proyectoTemplate(nombre, puesto, fcomienzo, fterminado, descripcion, referencias, id);
    $("#expproyectos_container").prepend(proyecto);
    index_proyecto++;

    $('#modal_agregar_proyecto').modal('toggle');
}

var id_proyecto = null;
var elem_proyecto = null;
function eliminarProyecto(res_id, elem){
    $("#modal_eliminar_proyecto").modal('toggle');
    id_proyecto = res_id;
    elem_proyecto = elem;
}

function confirmEliminarProyecto(){
    var index = proyectos.map(x => {
        return x.id;
    }).indexOf(id_proyecto);
    
    proyectos.splice(index, 1);
    $(elem_proyecto).parent().parent().parent().remove();
    id_proyecto = null;
    $("#modal_eliminar_proyecto").modal('toggle');
}

function editarProyecto(res_id, elem){
    id_proyecto   = res_id;
    elem_proyecto = elem;
    var proyecto = proyectos.find(item => item.id === id_proyecto);

    $("#nombre_proyecto").val(proyecto["nombre"]);
    $("#puesto_proyecto").val(proyecto["puesto"]);
    $("#fcomienzo_proyecto").val(proyecto["fcomienzo"]);
    $("#descripcion_proyecto").val(proyecto["descripcion"]);
    $("#referencias_proyecto").val(proyecto["referencias"]);

    if(proyecto["fterminado"] == "Actual"){
        $('#fterminado_proyecto').prop('disabled', true);
        $("#fterminado_proyecto").val("");
        $("#actual_proyecto").prop('checked', true);
    }else{
        $('#fterminado_proyecto').prop('disabled', false);
        $("#fterminado_proyecto").val(proyecto["fterminado"]);
        $("#actual_proyecto").prop('checked', false);
    }

    $("#btn_agregar_proyecto").html("Editar");
    $("#modal_agregar_proyecto").modal('toggle');
}

function confirmEditarProyecto(){
    var index = proyectos.map(x => {
        return x.id;
    }).indexOf(id_proyecto);
    
    proyectos.splice(index, 1);

    var nombre      = $("#nombre_proyecto").val().trim();
    var puesto      = $("#puesto_proyecto").val().trim();
    var fcomienzo   = $("#fcomienzo_proyecto").val().trim();
    var fterminado  = $("#fterminado_proyecto").val().trim();
    var descripcion = $("#descripcion_proyecto").val().trim();
    var referencias = $("#referencias_proyecto").val().trim();
    if ($('#actual_proyecto').is(":checked")){
        fterminado = "Actual";
    }

    var id = "temp_"+index_proyecto;
    proyectos.push({
        id: id,
        nombre: nombre,
        puesto: puesto,
        fcomienzo:fcomienzo,
        fterminado:fterminado,
        descripcion:descripcion,
        referencias:referencias
    });

    index_proyecto++;

    id_proyecto = null;

    $("#nombre_proyecto").val("");
    $("#puesto_proyecto").val("");
    $("#fcomienzo_proyecto").val("");
    $("#fterminado_proyecto").val("");
    $("#actual_proyecto").prop('checked', false);
    $("#descripcion_proyecto").val("");
    $("#referencias_proyecto").val("");

    var parent = $(elem_proyecto).parent().parent().find(".card-body");
    $(parent).find(".exp_titulo").text(nombre);
    $(parent).find(".exp_desc").text(puesto);
    $(parent).find(".exp_fecha").text("Desde " + fcomienzo + " hasta " + fterminado);
    $(parent).find(".exp_titulo_leng").first().text(descripcion);
    $(elem_proyecto).attr("onclick", "editarProyecto('" + id + "', this)");

    var links = referencias.split(",");
    var referencias = "";
    links.forEach(element => {
        referencias += "<li>" + element + "</li>";
    });
    $(parent).find(".exp_desc_leng").html(referencias);

    $("#modal_agregar_proyecto").modal('toggle');
}

var experiencias = [];
$('#actual_experiencia').change(function () {
    if ($('#actual_experiencia').is(":checked")){
        $('#fsalida_experiencia').prop('disabled', true);
    }else{
        $('#fsalida_experiencia').prop('disabled', false);
    }
});

var index_experiencia = 1;
function agregarExperiencia(){
    if(id_experiencia != null){
        confirmEditarExperiencia();
        return;
    }
    var empresa     = $("#empresa_experiencia").val().trim();
    var puesto      = $("#puesto_experiencia").val().trim();
    var fingreso    = $("#fingreso_experiencia").val().trim();
    var fsalida     = $("#fsalida_experiencia").val().trim();
    var herramientas = $("#herramientas_experiencia").val().trim();

    if(empresa == "" || puesto == "" || fingreso == ""){
        if(!$('#actual_experiencia').is(":checked") && fsalida == ""){
            showNotification("Faltan campos", "Ingrese todos los campos", "error");
            return;
        }
    }

    if ($('#actual_experiencia').is(":checked")){
        fsalida = "Actual";
    }

    var id = "temp_"+index_experiencia;
    experiencias.push({
        id: id,
        empresa: empresa,
        puesto: puesto,
        fingreso:fingreso,
        fsalida:fsalida,
        herramientas:herramientas
    });

    $("#empresa_experiencia").val("");
    $("#puesto_experiencia").val("");
    $("#fingreso_experiencia").val("");
    $("#fsalida_experiencia").val("");
    $("#actual_experiencia").prop('checked', false);
    $("#herramientas_experiencia").val("");

    var experiencia = experienciaTemplate(empresa, puesto, fingreso, fsalida, herramientas, id);
    $("#experiencias_container").prepend(experiencia);
    index_experiencia++;

    $('#modal_nueva_experiencia').modal('toggle');
}

var id_experiencia = null;
var elem_experiencia = null;
function eliminarExperiencia(res_id, elem){
    $("#modal_eliminar_experiencia").modal('toggle');
    id_experiencia = res_id;
    elem_experiencia = elem;
}

function confirmEliminarExperiencia(){
    var index = experiencias.map(x => {
        return x.id;
    }).indexOf(id_experiencia);
    
    experiencias.splice(index, 1);
    $(elem_experiencia).parent().parent().parent().remove();
    $("#modal_eliminar_experiencia").modal('toggle');
}

function editarExperiencia(res_id, elem){
    id_experiencia   = res_id;
    elem_experiencia = elem;
    var experiencia = experiencias.find(item => item.id === id_experiencia);

    $("#empresa_experiencia").val(experiencia["empresa"]);
    $("#puesto_experiencia").val(experiencia["puesto"]);
    $("#fingreso_experiencia").val(experiencia["fingreso"]);
    $("#herramientas_experiencia").val(experiencia["herramientas"]);

    if(experiencia["fsalida"] == "Actual"){
        $('#fsalida_experiencia').prop('disabled', true);
        $("#fsalida_experiencia").val("");
        $("#actual_experiencia").prop('checked', true);
    }else{
        $('#fsalida_experiencia').prop('disabled', false);
        $("#fsalida_experiencia").val(experiencia["fsalida"]);
        $("#actual_experiencia").prop('checked', false);
    }

    $("#btn_nueva_experiencia").html("Editar");
    $("#modal_nueva_experiencia").modal('toggle');
}

function confirmEditarExperiencia(){
    var index = experiencias.map(x => {
        return x.id;
    }).indexOf(id_experiencia);
    
    experiencias.splice(index, 1);

    var empresa     = $("#empresa_experiencia").val().trim();
    var puesto      = $("#puesto_experiencia").val().trim();
    var fingreso    = $("#fingreso_experiencia").val().trim();
    var fsalida     = $("#fsalida_experiencia").val().trim();
    var herramientas = $("#herramientas_experiencia").val().trim();

    if ($('#actual_experiencia').is(":checked")){
        fsalida = "Actual";
    }

    var id = "temp_"+index_experiencia;
    experiencias.push({
        id: id,
        empresa: empresa,
        puesto: puesto,
        fingreso:fingreso,
        fsalida:fsalida,
        herramientas:herramientas
    });
    
    index_experiencia++;

    id_experiencia = null;

    $("#empresa_experiencia").val("");
    $("#puesto_experiencia").val("");
    $("#fingreso_experiencia").val("");
    $("#fsalida_experiencia").val("");
    $("#actual_experiencia").prop('checked', false);
    $("#herramientas_experiencia").val("");

    var parent = $(elem_experiencia).parent().parent().find(".card-body");
    $(parent).find(".exp_titulo").text(empresa);
    $(parent).find(".exp_desc").text(puesto);
    $(parent).find(".exp_fecha").text("Desde " + fingreso + " hasta " + fsalida);
    $(elem_experiencia).attr("onclick", "editarExperiencia('" + id + "', this)");

    var links = herramientas.split(",");
    var herramientas = "";
    links.forEach(element => {
        herramientas += "<li>" + element + "</li>";
    });
    $(parent).find(".exp_desc_leng").html(herramientas);

    $("#modal_nueva_experiencia").modal('toggle');
}

var estudios = [];
var index_estudios = 1;
function agregarEstudio(){
    if(id_estudio != null){
        confirmEditarEstudio();
        return;
    }
    var titulo = $("#titulo_estudio").val().trim();
    var fecha  = $("#fecha_estudio").val().trim();
    var link   = $("#link_estudio").val().trim();

    if(titulo == "" || fecha == "" || link == ""){
        showNotification("Faltan campos", "Ingrese todos los campos", "error");
        return;
    }

    var id = "temp_"+index_estudios;
    estudios.push({
        id: id,
        titulo: titulo,
        fecha: fecha,
        link:link
    });

    $("#titulo_estudio").val("");
    $("#fecha_estudio").val("");
    $("#link_estudio").val("");

    var estudio = estudioTemplate(titulo, fecha, id);
    $("#estudios_container").prepend(estudio);
    index_estudios++;

    $('#modal_nuevo_estudio').modal('toggle');
}

var id_estudio = null;
var elem_estudio = null;
function eliminarEstudio(res_id, elem){
    $("#modal_eliminar_estudio").modal('toggle');
    id_estudio   = res_id;
    elem_estudio = elem;
}

function confirmEliminarEstudio(){
    var index = estudios.map(x => {
        return x.id;
    }).indexOf(id_estudio);
    
    estudios.splice(index, 1);
    $(elem_estudio).parent().parent().parent().remove();
    $("#modal_eliminar_estudio").modal('toggle');
}

function editarEstudio(res_id, elem){
    id_estudio   = res_id;
    elem_estudio = elem;
    var estudio = estudios.find(item => item.id === id_estudio);

    $("#titulo_estudio").val(estudio["titulo"]);
    $("#fecha_estudio").val(estudio["fecha"]);
    $("#link_estudio").val(estudio["link"]);

    $("#btn_nuevo_estudio").html("Editar");
    $("#modal_nuevo_estudio").modal('toggle');
}

function confirmEditarEstudio(){
    var index = estudios.map(x => {
        return x.id;
    }).indexOf(id_estudio);
    
    estudios.splice(index, 1);

    var titulo = $("#titulo_estudio").val().trim();
    var fecha  = $("#fecha_estudio").val().trim();
    var link   = $("#link_estudio").val().trim();

    var id = "temp_"+index_estudios;
    estudios.push({
        id: id,
        titulo: titulo,
        fecha: fecha,
        link:link
    });
    
    index_estudios++;

    id_estudio = null;

    $("#titulo_estudio").val("");
    $("#fecha_estudio").val("");
    $("#link_estudio").val("");

    var parent = $(elem_estudio).parent().parent().find(".card-body");
    $(parent).find(".exp_titulo").text(titulo);
    $(parent).find(".exp_desc").text(fecha);
    $(elem_estudio).attr("onclick", "editarEstudio('" + id + "', this)");

    $("#modal_nuevo_estudio").modal('toggle');
}

function validarLink(){
    var link = $("#linkCV").val();
    if(link.length > 10){
        $('#validar_cv').prop('disabled', false);
    }else{
        $('#validar_cv').prop('disabled', true);
    }
}

function validateCVLink(){
    var link = $("#linkCV").val();
    if(link.indexOf(' ')>=0 || link.indexOf('.')>=0 || link.indexOf('/')>=0 || link.indexOf('?')>=0){
        showNotification("Link no admitido", "El link solo puede contener letras o guiones", "info");
        return;
    }
    validarLinkCV(link);
}

function verMiCv(){
    var link = $("#linkCV").val();
    location.href = "http://localhost:3000/micv/" + link;
}

function changeDepartamento(){
    var id_dept = $("#departamento").val();
    var provincias_result = $.grep(temp_provincias, function (obj) {
        return obj[id_dept];
    });
    var provincias_result_array = provincias_result[0][id_dept];
    var $distritos_select = $("#distrito");
    $distritos_select.html("");
    provincias_result_array.forEach(element => {
        distritos_encontrados = $.grep(temp_distritos, function (obj) {
            return obj[element.codprovincia];
        });
        distritos = distritos_encontrados[0][Object.keys(distritos_encontrados[0])[0]];
        distritos.forEach(element => {
            $distritos_select.append($("<option />").val(element.coddistrito).text(element.distrito));
        });
    });
}

function showNotification(title, message, theme){
    window.createNotification({
        closeOnClick: true,
        positionClass: 'nfc-top-right',
        theme: theme
    })({
        title: title,
        message: message,
    });
}