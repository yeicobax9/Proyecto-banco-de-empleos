document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            navegarA(sectionId);
        });
    });

    navegarA('dashboard');
});

function navegarA(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    const navItems = document.querySelectorAll('[data-section]');
    navItems.forEach(item => {
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function agregarRequisito() {
    const list = document.getElementById('requisitos-list');
    const newItem = document.createElement('div');
    newItem.className = 'requisito-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Ej: 3 años de experiencia en..." class="requisito-input">
        <button type="button" class="btn-remove-requisito" onclick="removerRequisito(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    list.appendChild(newItem);
}

function removerRequisito(button) {
    button.parentElement.remove();
}

function agregarFuncion() {
    const list = document.getElementById('funciones-list');
    const newItem = document.createElement('div');
    newItem.className = 'funcion-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Ej: Desarrollar módulos..." class="funcion-input">
        <button type="button" class="btn-remove-funcion" onclick="removerFuncion(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    list.appendChild(newItem);
}

function removerFuncion(button) {
    button.parentElement.remove();
}

function agregarBeneficio() {
    const list = document.getElementById('beneficios-list');
    const newItem = document.createElement('div');
    newItem.className = 'beneficio-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Ej: Seguro médico..." class="beneficio-input">
        <button type="button" class="btn-remove-beneficio" onclick="removerBeneficio(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    list.appendChild(newItem);
}

function removerBeneficio(button) {
    button.parentElement.remove();
}

const formularioVacante = document.getElementById('formularioVacante');
if (formularioVacante) {
    formularioVacante.addEventListener('submit', (e) => {
        e.preventDefault();

        const puesto = document.getElementById('puesto').value;
        const departamento = document.getElementById('departamento').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const salario_min = document.getElementById('salario_min').value;
        const salario_max = document.getElementById('salario_max').value;
        const tipo_contrato = document.getElementById('tipo_contrato').value;
        const descripcion = document.getElementById('descripcion').value;

        const requisitos = Array.from(document.querySelectorAll('.requisito-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');

        const funciones = Array.from(document.querySelectorAll('.funcion-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');

        const beneficios = Array.from(document.querySelectorAll('.beneficio-input'))
            .map(input => input.value)
            .filter(value => value.trim() !== '');

        const fechaCierre = document.getElementById('fecha_cierre').value;

        if (!puesto || !departamento || !ubicacion || !salario_min || !salario_max || !tipo_contrato || !descripcion) {
            alert('¡Oops! 🚫 Asegúrate de llenar todos los campos requeridos');
            return;
        }

        const vacante = {
            puesto,
            departamento,
            ubicacion,
            salario: { min: salario_min, max: salario_max },
            tipo_contrato,
            descripcion,
            requisitos,
            funciones,
            beneficios,
            fecha_cierre: fechaCierre,
            fecha_publicacion: new Date().toLocaleDateString()
        };

        let vacantes = JSON.parse(localStorage.getItem('vacantes')) || [];
        vacantes.push(vacante);
        localStorage.setItem('vacantes', JSON.stringify(vacantes));

        alert('¡Yesss! 🎉 Tu vacante se publicó correctamente \n¡Ahora a esperar los mejores candidatos!');
        formularioVacante.reset();

        document.getElementById('requisitos-list').innerHTML = `
            <div class="requisito-item">
                <input type="text" placeholder="Ej: 3 años de experiencia en..." class="requisito-input">
                <button type="button" class="btn-remove-requisito" onclick="removerRequisito(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        document.getElementById('funciones-list').innerHTML = `
            <div class="funcion-item">
                <input type="text" placeholder="Ej: Desarrollar módulos..." class="funcion-input">
                <button type="button" class="btn-remove-funcion" onclick="removerFuncion(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        document.getElementById('beneficios-list').innerHTML = `
            <div class="beneficio-item">
                <input type="text" placeholder="Ej: Seguro médico..." class="beneficio-input">
                <button type="button" class="btn-remove-beneficio" onclick="removerBeneficio(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        setTimeout(() => {
            navegarA('mis-vacantes');
        }, 500);
    });
}

const searchVacantes = document.getElementById('searchVacantes');
if (searchVacantes) {
    searchVacantes.addEventListener('input', filtrarVacantes);
}

const filterEstado = document.getElementById('filterEstado');
if (filterEstado) {
    filterEstado.addEventListener('change', filtrarVacantes);
}

function filtrarVacantes() {
    const searchTerm = document.getElementById('searchVacantes').value.toLowerCase();
    const estadoFilter = document.getElementById('filterEstado').value;
    const filas = document.querySelectorAll('tbody tr');

    filas.forEach(fila => {
        const puesto = fila.cells[0].textContent.toLowerCase();
        const estado = fila.cells[3].textContent.toLowerCase();

        const coincideSearch = puesto.includes(searchTerm);
        const coincideEstado = !estadoFilter || estado.includes(estadoFilter.toLowerCase());

        fila.style.display = coincideSearch && coincideEstado ? '' : 'none';
    });
}

const searchCandidatos = document.getElementById('searchCandidatos');
if (searchCandidatos) {
    searchCandidatos.addEventListener('input', filtrarCandidatos);
}

const filterVacante = document.getElementById('filterVacante');
if (filterVacante) {
    filterVacante.addEventListener('change', filtrarCandidatos);
}

const filterEtapa = document.getElementById('filterEtapa');
if (filterEtapa) {
    filterEtapa.addEventListener('change', filtrarCandidatos);
}

function filtrarCandidatos() {
    const searchTerm = document.getElementById('searchCandidatos').value.toLowerCase();
    const vacanteFilter = document.getElementById('filterVacante').value;
    const etapaFilter = document.getElementById('filterEtapa').value;

    const cards = document.querySelectorAll('.candidato-card');

    cards.forEach(card => {
        const nombre = card.querySelector('.candidato-info h4').textContent.toLowerCase();
        const puesto = card.querySelector('.puesto-aplicado').textContent.toLowerCase();
        const etapa = card.querySelector('.badge').textContent.toLowerCase();

        const coincideSearch = nombre.includes(searchTerm) || puesto.includes(searchTerm);
        const coincidePuesto = !vacanteFilter || puesto.includes(vacanteFilter.toLowerCase());
        const coincideEtapa = !etapaFilter || etapa.includes(etapaFilter.toLowerCase());

        card.style.display = coincideSearch && coincidePuesto && coincideEtapa ? '' : 'none';
    });
}

const formularioperfil = document.getElementById('formularioperfil');
if (formularioperfil) {
    formularioperfil.addEventListener('submit', (e) => {
        e.preventDefault();

        const perfilData = {
            nombre_empresa: document.getElementById('nombre_empresa').value,
            rfc: document.getElementById('rfc').value,
            sector: document.getElementById('sector').value,
            empleados: document.getElementById('empleados').value,
            sitio_web: document.getElementById('sitio_web').value,
            descripcion_empresa: document.getElementById('descripcion_empresa').value,
            contacto_nombre: document.getElementById('contacto_nombre').value,
            contacto_email: document.getElementById('contacto_email').value,
            contacto_telefono: document.getElementById('contacto_telefono').value,
            contacto_puesto: document.getElementById('contacto_puesto').value,
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            pais: document.getElementById('pais').value
        };

        localStorage.setItem('perfilEmpresa', JSON.stringify(perfilData));

        alert('¡Perfil actualizado exitosamente!');
    });
}

const btnLogout = document.querySelector('.btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            alert('Sesión cerrada');
        }
    });
}

const btnAcciones = document.querySelectorAll('.btn-accion');
btnAcciones.forEach(btn => {
    btn.addEventListener('click', function() {
        const fila = this.closest('tr');
        const puesto = fila.cells[0].textContent;

        if (this.querySelector('i').classList.contains('fa-eye')) {
            alert('Ver detalles de: ' + puesto);
        } else if (this.querySelector('i').classList.contains('fa-edit')) {
            alert('Editar vacante: ' + puesto);
        } else if (this.querySelector('i').classList.contains('fa-users')) {
            navegarA('candidatos');
        } else if (this.querySelector('i').classList.contains('fa-trash')) {
            if (confirm('¿Estás seguro de que deseas eliminar esta vacante?')) {
                fila.remove();
                alert('Vacante eliminada');
            }
        }
    });
});

const btnCandidatoActions = document.querySelectorAll('.candidato-actions .btn');
btnCandidatoActions.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.candidato-card');
        const nombre = card.querySelector('.candidato-info h4').textContent;

        if (this.textContent.includes('CV')) {
            alert('Descargar CV de ' + nombre);
        } else if (this.textContent.includes('Entrevista') || this.textContent.includes('Cambiar Estado')) {
            alert('Agendar entrevista para ' + nombre);
        } else if (this.textContent.includes('Rechazar')) {
            if (confirm('¿Rechazar a ' + nombre + '?')) {
                card.style.opacity = '0.5';
                alert('Candidato rechazado');
            }
        }
    });
});

function cargarDatos() {
    const vacantes = JSON.parse(localStorage.getItem('vacantes')) || [];
    const perfil = JSON.parse(localStorage.getItem('perfilEmpresa')) || {};

    if (perfil.nombre_empresa) {
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = perfil.nombre_empresa;
        }
    }

    console.log('Vacantes cargadas:', vacantes);
    console.log('Perfil de la empresa:', perfil);
}

cargarDatos();

function confirmarEliminacion(elemento) {
    elemento.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        elemento.remove();
    }, 300);
}
