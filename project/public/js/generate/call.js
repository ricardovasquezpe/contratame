var id_user_created = null;
function infobasica(data){
    $.ajax({
        type: 'POST',
        url: "generate/infobasica",
        data: data,
        dataType: 'json',
        success :function(result) {
            id_user_created = result.data;
        }
    });
}

function generateCV(proyectos, experiencias, skills, idiomas, estudios){
    var data = {
        proyectos: JSON.stringify(proyectos),
        experiencias: JSON.stringify(experiencias),
        skills: JSON.stringify(skills),
        idiomas : JSON.stringify(idiomas),
        estudios : JSON.stringify(estudios),
        id_user : id_user_created
    };
    $.ajax({
        type: 'POST',
        url: "generate/generatecv",
        data: data,
        dataType: 'json',
        success :function(result) {
            console.log(result)
        }
    });
}