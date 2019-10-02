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
function agregarProyecto(){
    var nombre      = $("#nombre_proyecto").val();
    var puesto      = $("#puesto_proyecto").val();
    var fcomienzo   = $("#fcomienzo_proyecto").val();
    var fterminado  = $("#fterminado_proyecto").val();
    var actual      = $("#actual_proyecto").val();
    var descripcion = $("#descripcion_proyecto").val();
    var referencias = $("#referencias_proyecto").val();

    proyectos.push({
        nombre: nombre,
        puesto: puesto,
        fcomienzo:fcomienzo,
        fterminado:fterminado,
        actual:actual,
        descripcion:descripcion,
        referencias:referencias
    });

    $("#nombre_proyecto").val("");
    $("#puesto_proyecto").val("");
    $("#fcomienzo_proyecto").val("");
    $("#fterminado_proyecto").val("");
    $('#actual_proyecto').removeAttr('checked');
    $("#descripcion_proyecto").val("");
    $("#referencias_proyecto").val("");

    var proyecto = proyectoTemplate(nombre, puesto, fcomienzo, fterminado, descripcion, referencias);
    $("#expproyectos_container").prepend(proyecto);

    $('#modal_agregar_proyecto').modal('toggle');
}

