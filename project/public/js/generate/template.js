function proyectoTemplate(nombre, puesto, fcomienzo, fterminado, descripcion, referencias){
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
                <button type="button" class="btn btn-outline-primary btn-sm">Editar</button>
                <button type="button" class="btn btn-outline-primary btn-sm">Eliminar</button>
            </div>
        </div>
    </div>`;

    return template;
}