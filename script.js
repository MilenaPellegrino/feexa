
const startDates = [
    new Date("2025-02-10"),
    new Date("2025-02-24"),
    new Date("2025-06-30"),
    new Date("2025-07-21"),
    new Date("2025-08-04"),
    new Date("2025-12-01"),
    new Date("2025-12-15"),
];

const ExamdatesByYear = {
    1: {
        "INTRODUCCIÓN A LOS ALGORITMOS": { day: 1 },
        "ANÁLISIS MATEMÁTICO I": { day: 3 },
        "MATEMÁTICA DISCRETA I": { day: 4 },
        "ÁLGEBRA ": { day: 1 },
        "ALGORITMOS Y ESTRUCTURAS DE DATOS I": { day: 2 },
        "ANÁLISIS MATEMÁTICO II": { day: 4 },
    },
    2: {
        "ANÁLISIS NUMÉRICO ": { day: 2 },
        "ORGANIZACIÓN DEL COMPUTADOR": { day: 5 },
        "PROBABILIDAD Y ESTADÍSTICA": { day: 1 },
        "INTRODUCCIÓN A LA LÓGICA Y LA COMPUTACIÓN ": { day: 3 },
        "ALGORITMOS Y ESTRUCTURAS DE DATOS II": { day: 3 },
        "SISTEMAS OPERATIVOS": { day: 5 },
    },
    3: {
        "MATEMÁTICA DISCRETA II": { day: 1 },
        "PARADIGMAS DE PROGRAMACIÓN": { day: 3 },
        "REDES Y SISTEMAS DISTRIBUÍDOS": { day: 4 },
        "BASES DE DATOS": { day: 1 },
        "INGENIERÍA DEL SOFTWARE I": { day: 3 },
        "ARQUITECTURA DE COMPUTADORAS": { day: 5 },
    },
    4: {
        "FÍSICA": { day: 2 },
        "LÓGICA": { day: 4 },
        "MODELOS Y SIMULACIÓN": { day: 1 },
        "LENGUAJES FORMALES Y COMPUTABILIDAD": { day: 4 },
    },
    5: {
        "LENGUAJES Y COMPILADORES": { day: 2 },
        "INGENIERÍA DEL SOFTWARE II": { day: 4 },
    }, 
    6: {
        "EXAMEN DE SUFICIENCIA DE IDIOMA INGLÉS": { day: 5 },
        "OTRAS OPTATIVAS": { day: 5 },
    }
};

// Function to load the subject options according to the selected year
function loadSubjects() {
    const selectedYear = document.getElementById("year").value;
    const subjectsYear = ExamdatesByYear[selectedYear];
    const subjectSelect = document.getElementById("subject");
    
    subjectSelect.innerHTML = "";

    for (let subject in subjectsYear) {
        const option = document.createElement("option");
        option.value = subject;
        option.text = subject;
        subjectSelect.appendChild(option);
    }
}

// Call loadSubjects() initially to display the subjects of the selected year by default
window.onload = loadSubjects;

function calculateDatesExam() {
    const selectedYear = document.getElementById("year").value;
    const subjectsSelect = document.getElementById("subject").value;
    const result = document.getElementById("result");
    result.innerHTML = ""; 

    const dayExamen = ExamdatesByYear[selectedYear]?.[subjectsSelect]?.day;

    if (dayExamen !== undefined) {
        let dateCounter = 1; 
        startDates.forEach((fechaInicio, index) => {

            if (index === 0) {
                result.innerHTML += "<h3>Exámenes enero/febrero</h3>";
                dateCounter = 1;
            } else if (index === 2) {
                result.innerHTML += "<h3>Exámenes julio/agosto</h3>";
                dateCounter = 1;
            } else if (index === 5) {
                result.innerHTML += "<h3 style=margin-top: 20px; >Exámenes noviembre/diciembre</h3>";
                dateCounter = 1;
            } 

            // Calcular la fecha de examen
            const examDate = new Date(fechaInicio);
            examDate.setDate(fechaInicio.getDate() + dayExamen);

            const day = examDate.getDate().toString().padStart(2, '0');
            const month = (examDate.getMonth() + 1).toString().padStart(2, '0'); 
            const year = examDate.getFullYear();

            result.innerHTML += `<p><strong>Llamado ${dateCounter}:</strong>  ${day}/${month}/${year}</p>`;

            dateCounter++; 
        });
    } else {
        result.innerText = "Por favor, selecciona una materia válida.";
    }
    result.style.display = "block";
}


