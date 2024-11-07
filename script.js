// script.js

// Configuración de Supabase
const SUPABASE_URL = 'https://xsswlvpoxczrrxwzchob.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzc3dsdnBveGN6cnJ4d3pjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2OTU1MTEsImV4cCI6MjA0NjI3MTUxMX0._h0u9MfymU81SDX9-gPPy9_vb-zSx4Aei5Dpog1tCq0';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para cargar los puntajes de los miembros
async function cargarPuntajes() {
    try {
        const { data, error } = await supabase
            .from('miembros') // Reemplaza 'miembros' con el nombre de tu tabla
            .select('nombre_completo, puntaje'); // Cambia 'nombre' por 'nombre_completo'
  
        if (error) throw error;
  
        const tbody = document.querySelector("#score-table tbody");
        tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla
  
        data.forEach(member => {
            const row = document.createElement("tr");
  
            // Crear celdas de nombre completo y puntaje
            const nombreCell = document.createElement("td");
            nombreCell.textContent = member.nombre_completo; // Mostrar el nombre completo
            const puntajeCell = document.createElement("td");
            puntajeCell.textContent = member.puntaje;
  
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
