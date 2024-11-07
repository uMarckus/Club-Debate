// script.js

// Configuración de Supabase
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xsswlvpoxczrrxwzchob.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Función para cargar los puntajes de los miembros
async function cargarPuntajes() {
    try {
        // Realizando el join entre miembro y puntaje
        let { data: miembro, error } = await supabase
            .from('miembro') // Tabla miembro
            .select(`
                nombre_estudiante, 
                p_apellido, 
                s_apellido, 
                puntaje:puntaje  // Obtenemos puntaje desde la tabla puntaje usando el alias
            `)
            .join('puntaje', 'miembro.id_puntaje', 'puntaje.id_puntaje'); // Join entre las tablas

        if (error) throw error;

        const tbody = document.querySelector("#score-table tbody");
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla
  
        // Iterar sobre los datos y agregar las filas a la tabla
        data.forEach(member => {
            const row = document.createElement("tr");
  
            // Crear celdas para el nombre completo y el puntaje
            const nombreCell = document.createElement("td");
            nombreCell.textContent = `${member.nombre_estudiante} ${member.p_apellido} ${member.s_apellido}`; // Nombre completo
            const puntajeCell = document.createElement("td");
            puntajeCell.textContent = member.puntaje; // Puntaje
  
            row.appendChild(nombreCell);
            row.appendChild(puntajeCell);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los puntajes:", error.message);
        alert("Hubo un error al cargar los puntajes.");
    }
}
  
// Llamar a la función para cargar los datos al cargar la página
window.addEventListener("load", cargarPuntajes);
