function proyectoTemplate(nombre, puesto, fcomienzo, fterminado, descripcion, referencias, id){
    var links = referencias.split(",");
    var referencias = "";
    links.forEach(element => {
        referencias += "<li>" + element + "</li>";
    });
    var template = 
    `<div class="col-sm-6 col-md-6 col-lg-4 col-lg-4">
        <div class="card square">
            <div class="card-body" style="padding-bottom: 0">
                <div class="text-center">
                    <p class="exp_titulo">` + nombre + `</p>
                </div>
                <div class="text-center">
                    <p class="exp_desc">` + puesto + `</p>
                </div>
                <div class="text-center">
                    <p class="exp_fecha">Desde ` + fcomienzo + ` hasta ` + fterminado + `</p>
                </div>
                <div>
                    <p class="exp_titulo_leng">` + descripcion + `
                    </p>
                </div>
                <div style="margin-top: 10px">
                    <p class="exp_titulo_leng">Referencias</p>
                    <ul class="exp_desc_leng" style="text-decoration: underline;cursor: pointer;">
                    ` + referencias + `
                    </ul>
                </div>
            </div>
            <div class="card-footer bg-transparent text-center">
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="editarProyecto('` + id + `', this)">Editar</button>
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="eliminarProyecto('` + id + `', this)">Eliminar</button>
            </div>
        </div>
    </div>`;

    return template;
}

function experienciaTemplate(empresa, puesto, fingreso, fsalida, herramientas, id){
    var links = herramientas.split(",");
    var herramientas = "";
    links.forEach(element => {
        herramientas += "<li>" + element + "</li>";
    });
    var template = `
        <div class="col-sm-6 col-md-6 col-lg-4 col-lg-4">
            <div class="card square">
                <div class="card-body" style="padding-bottom: 0">
                    <div class="text-center">
                        <p class="exp_titulo">` + empresa + `</p>
                    </div>
                    <div class="text-center">
                        <p class="exp_desc">` + puesto + `</p>
                    </div>
                    <div class="text-center">
                        <p class="exp_fecha">Desde ` + fingreso + ` hasta ` + fsalida + `</p>
                    </div>
                    <div>
                        <p class="exp_titulo_leng">Lenguajes de programación / Herramientas</p>
                        <ul class="exp_desc_leng">
                        ` + herramientas + `
                        </ul> 
                    </div>
                </div>
                <div class="card-footer bg-transparent text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="editarExperiencia('` + id + `', this)">Editar</button>
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="eliminarExperiencia('` + id + `', this)">Eliminar</button>
                </div>
            </div>
        </div>`;

    return template;
}

function estudioTemplate(titulo, fecha, id){
    var template = `
    <div class="col-sm-6 col-lg-3 col-md-4">
        <div class="card square">
            <div class="card-body" style="padding-bottom: 0">
                <div class="text-center">
                    <p class="exp_titulo"> ` + titulo + `</p>
                </div>
                <div class="text-center">
                    <p class="exp_desc"> ` + fecha + `</p>
                </div>
            </div>
            <div class="card-footer bg-transparent text-center">
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="editarExperiencia('` + id + `', this)">Editar</button>
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="eliminarEstudio('` + id + `', this)">Eliminar</button>
            </div>
        </div>
    </div>`;

    return template;
}