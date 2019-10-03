$(document).ready(function () {
    $(".screen").page();
    tipsInterval = setInterval(moveItem,12000);
    //$('#modal_bienvenida').modal('toggle');
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
            //return;
        }

        if($("#telefono").val().length != 9){
            //return;
        }
    }else if(index_page == 2){

    }else if(index_page == 3){
        $("#siguiente").html("Terminar");
    }else if(index_page == 4){
        $('#modal_terminando').modal('toggle');
        setTimeout(function(){ 
            $("#cv_cargando").hide();
            $("#cv_completo").show(); 
            $('#ver_mi_cv').prop('disabled', false);
        }, 5000);
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
    $('#actual_proyecto').removeAttr('checked');
    $("#actual_proyecto").attr("checked", false);
    $("#descripcion_proyecto").val("");
    $("#referencias_proyecto").val("");

    var proyecto = proyectoTemplate(nombre, puesto, fcomienzo, fterminado, descripcion, referencias, id);
    $("#expproyectos_container").prepend(proyecto);

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
    $("#modal_eliminar_proyecto").modal('toggle');
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
    $('#actual_experiencia').removeAttr('checked');
    $("#actual_experiencia").attr("checked", false);
    $("#herramientas_experiencia").val("");

    var experiencia = experienciaTemplate(empresa, puesto, fingreso, fsalida, herramientas, id);
    $("#experiencias_container").prepend(experiencia);

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

var estudios = [];
var index_estudios = 1;
function agregarEstudio(){
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