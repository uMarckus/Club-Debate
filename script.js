// Importamos la función createClient desde la biblioteca de Supabase para interactuar con la base de datos
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración de Supabase: URL de tu proyecto y la clave API para autenticar la conexión
const supabaseUrl = 'https://xsswlvpoxczrrxwzchob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzc3dsdnBveGN6cnJ4d3pjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2OTU1MTEsImV4cCI6MjA0NjI3MTUxMX0._h0u9MfymU81SDX9-gPPy9_vb-zSx4Aei5Dpog1tCq0';
const supabase = createClient(supabaseUrl, supabaseKey);  // Creamos la instancia del cliente Supabase

// Función asincrónica para cargar los puntajes de los miembros
async function cargarPuntajes() {
    try {
        // Realizamos una única consulta con JOIN entre las tablas 'miembro' y 'puntaje'
        const { data: miembrosPuntajes, error } = await supabase
            .from('miembro')  // Especificamos la tabla 'miembro'
            .select(`
                nombre_estudiante, 
                p_apellido, 
                s_apellido, 
                puntaje:puntaje(puntaje)  // Esto realiza el JOIN con la tabla 'puntaje' y selecciona la columna 'puntaje'
            `);

        // Si ocurre un error en la consulta, lo lanzamos
        if (error) throw error;

        // Verificamos la estructura de los datos devueltos
        console.log('Datos de miembrosPuntajes:', miembrosPuntajes);

        // Seleccionamos el cuerpo de la tabla donde se mostrarán los puntajes
        const tbody = document.querySelector("#score-table tbody");
        tbody.innerHTML = '';  // Limpiamos la tabla antes de llenarla con los nuevos datos

        // Recorrimos los datos combinados de miembros y puntajes
        miembrosPuntajes.forEach((miembro) => {
            const row = document.createElement("tr");  // Creamos una nueva fila para cada miembro

            // Creamos una celda para el nombre completo del miembro
            const nombreCell = document.createElement("td");
            nombreCell.textContent = `${miembro.nombre_estudiante} ${miembro.p_apellido} ${miembro.s_apellido}`;
            
            // Creamos una celda para el puntaje del miembro
            const puntajeCell = document.createElement("td");
            // Accedemos al primer elemento del arreglo y luego a la propiedad puntaje
            const puntaje = miembro.puntaje?.[0]?.puntaje; // Aquí accedemos al primer elemento del arreglo y luego al puntaje
            puntajeCell.textContent = puntaje ?? 'Sin puntaje';  // Mostramos el puntaje si existe

            // Agregamos las celdas a la fila
            row.appendChild(nombreCell);
            row.appendChild(puntajeCell);

            // Agregamos la fila al cuerpo de la tabla
            tbody.appendChild(row);
        });
    } catch (error) {
        // Si ocurre un error durante la carga, lo mostramos en la consola y mostramos una alerta al usuario
        console.error("Error al cargar los puntajes:", error.message);
        alert("Hubo un error al cargar los puntajes.");
    }
}

// Llamamos a la función cargarPuntajes cuando la página termine de cargar
window.addEventListener("load", cargarPuntajes);
