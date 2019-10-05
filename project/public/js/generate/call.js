var id_user_created = null;
function infobasica(data){
    $.ajax({
        type: 'POST',
        url: "generar/infobasica",
        data: data,
        dataType: 'json',
        success :function(result) {
            id_user_created = result.data;
        }
    });
}

function generateCV(proyectos, experiencias, skills, idiomas, estudios){
    var data = {
        proyectos    : JSON.stringify(proyectos),
        experiencias : JSON.stringify(experiencias),
        skills       : JSON.stringify(skills),
        idiomas      : JSON.stringify(idiomas),
        estudios     : JSON.stringify(estudios),
        id_user      : id_user_created
    };

    $.ajax({
        type: 'POST',
        url: "generar/generarcv",
        data: data,
        dataType: 'json',
        success :function(result) {
            if(result.status){
                $("#cv_cargando").hide();
                $("#cv_link").show(); 
            }
        }
    });
}

function validarLinkCV(link){
    $("#cv_cargando").show();
    var data = {
        link : link,
        id_user : id_user_created
    };

    $.ajax({
        type: 'POST',
        url: "generar/validarLinkCv",
        data: data,
        dataType: 'json',
        success :function(result) {
            $("#cv_cargando").hide();
            if(result.status){
                $("#cv_link").hide();
                $("#cv_completo").show(); 
            }else{
                showNotification("Link no disponible", "Use otro link, puede ser tu nombre completo", "error");
            }
        }
    });
}