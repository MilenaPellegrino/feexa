
const startDates = [
    new Date("2026-02-09"),
    new Date("2026-02-23"),
    new Date("2026-06-29"),
    new Date("2026-07-20"),
    new Date("2026-08-03"),
    new Date("2026-11-30"),
    new Date("2026-12-14"),
];
const ExamdatesByCareer = {
    computacion: {
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
    },
    maplicada: {
        1: {
            "ALGORITMO Y PROGRAMACIÓN": { day: 1 },
            "CÁLCULO I": { day: 3 },
            "MATEMÁTICA DISCRETA I": { day: 4 },
            "ÁLGEBRA LINEAL": { day: 1 },
            "FÍSICA I": { day: 2 },
            "CALCULO II": { day: 4 },
            },
        2: {
            "ANÁLISIS NUMÉRICO I ": { day: 2 },
            "CÁLCULO VECTORIAL": { day: 5 },
            "FÍSICA II": { day: 3 },
            "ANÁLISIS NUMÉRICO II": { day: 4 },
            "PROBABILIDAD Y ESTADÍSTICA": { day: 1 },
            "FUNCIONES COMPLEJAS": { day: 2 },
            },
        3: {
            "ALGORITMOS Y ESTRUCTURAS DE DATOS": { day: 3 },
            "ECUACIONES DIFERENCIALES I": { day: 5 },
            "MODELOS Y SIMULACIÓN": { day: 1 },
            "ECUACIONES DIFERENCIALES II": { day: 3 },
            "ANÁLISIS NUMÉRICO III": { day: 5 },
            "MATEMÁTICA FINANCIERA": { day: 1 },
        },
        4: {
            "INVESTIGACIÓN DE OPERACIONES": { day: 5 },
            "CIENCIA DE DATOS": { day: 3 },
            "MATEMÁTICA DISCRETA II": { day: 1 },
            "SISTEMAS DE CONTROL": { day: 2 },
            "OPTIMIZACIÓN": { day: 4 },
            },
        5: {
            "MODELOS DE PROGRAMACIÓN": { day: 3 },
            "GESTIÓN DE PROYECTOS": { day: 2 },
            }, 
        6: {
            //"EXAMEN DE SUFICIENCIA DE IDIOMA INGLÉS": { day: 5 },
            "OPTATIVAS": { day: 5 },
        }
    },
    matematica: {
        1: {
            "ÁLGEBRA I": { day: 1 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "INTRODUCCIÓN A LA FÍSICA": { day: 4 },
            "FÍSICA GENERAL": { day: 2 },
            "ÁGEBRA II": { day: 1 },
            "ANÁLISIS MATEMÁTICO II": { day: 4 },
            },
        2: {
            "ÁLGEBRA III": { day: 1 },
            "ANÁLISIS MATEMÁTICO III": { day: 4 },
            "ANÁLISIS NUMÉRICO I": { day: 2 },
            "GEOMETRÍA DIFERENCIAL": { day: 1 },
            "PROBABILIDAD": { day: 2 },
            "ANÁLISIS NUMÉRICO II": { day: 4 },
            },
        3: {
            "TOPOLOGÍA GENERAL": { day: 4 },
            "FUNCIONES REALES": { day: 2 },
            "ESTRUCTURAS ALGEBRAICAS": { day: 4 },
            "FUNCIONES ANALÍTICAS": { day: 2 },
        },
        4: {
            "ECUACIONES DIFERENCIALES I": { day: 5 },
            "GEOMETRÍA SUPERIOR": { day: 3 },
            "ANÁLISIS FUNCIONAL": { day: 2 },
            "ECUACIONES DIFERENCIALES II": { day: 4 },
            },
        5: {
            "INFERENCIA ESTADÍSTICA": { day: 4 },
            "ESPECIALIDADES": { day: 5 },
            }, 
        6: {
            //"EXAMEN DE SUFICIENCIA DE IDIOMA INGLÉS": { day: 5 },
            "OPTATIVAS": { day: 5 },
        }
    },
    astronomia: {
        1: {
            "INTRODUCCIÓN A LA FÍSICA": { day: 4 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "ÁGEBRA II": { day: 1 },
            "FÍSICA GENERAL I": { day: 2 },
            "ÁGEBRA I": { day: 1 },
            "ANÁLISIS MATEMÁTICO II ": { day: 4 },
            },
        2: {
            "FÍSICA GENERAL II": { day: 1 },
            "ANÁLISIS MATEMÁTICO III": { day: 4 },
            "ASTRONOMÍA GENERAL": { day: 3 },
            "MÉTODOS MATEMÁTICOS DE LA FÍSICA I": { day: 1 },
            "FÍSICA GENERAL III": { day: 3 },
            },
        3: {
            "ÓPTICA ASTRONÓMICA": { day: 5 },
            "MÉTODOS MATEMÁTICOS DE LA FÍSICA II": { day: 2 },
            "ELECTROMAGNETISMO I": { day: 4 },
            "MECÁNICA": { day: 1 },
            "ASTRONOMÍA ESFÉRICA": { day: 4 },
            "ELECTROMAGNETISMO II": { day: 3 },
        },
        4: {
            "ASTROFÍSICA GENERAL": { day: 1 },
            "SEMINARIO I": { day: 5 },
            "COMPLEMENTOS DE FÍSICA MODERNA": { day: 4 },
            "ASTRONOMÍA GENERAL": { day: 3 },
            "ASTROMETRÍA": { day: 4 },
            "ASTROFÍSICA I": { day: 4 },
            "ESPECIALIDAD": { day: 5 },
            "SEMINARIO II": { day: 5 },
            "MECÁNICA CELESTE": { day: 3 },
            },
        5: {
            "SEMINARIO III": { day: 5 },
            "ESPECIALIDADES": { day: 5 },
            "SEMINARIO IV": { day: 5 },
            }, 
    },
    fisica: {
        1: {
            "INTRODUCCIÓN A LA FÍSICA": { day: 4 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "ÁGEBRA I": { day: 1 },
            "FÍSICA GENERAL I": { day: 2 },
            "ÁGEBRA I": { day: 1 },
            "ANÁLISIS MATEMÁTICO II ": { day: 4 },
            },
        2: {
            "FÍSICA GENERAL II": { day: 1 },
            "ANÁLISIS MATEMÁTICO III": { day: 4 },
            "MÉTODOS NUMÉRICOS": { day: 2 },
            "MÉTODOS MATEMÁTICOS DE LA FÍSICA I": { day: 1 },
            "FÍSICA GENERAL III": { day: 3 },
            },
        3: {
            "FÍSICA GENERAL IV": { day: 5 },
            "ELECTROMAGNETISMO I": { day: 4 },
            "MÉTODOS MATEMÁTICOS DE LA FÍSICA II": { day: 2 },
            "MECÁNICA": { day: 1 },
            "ELECTROMAGNETISMO II": { day: 3 },
        },
        4: {
            "MECÁNICA CUÁNTICA I": { day: 1 },
            "TERMODINÁMICA Y MECÁNICA ESTADÍSTICA I": { day: 3 },
            "ESPECIALIDAD": { day: 5 },
            "TERMODINÁMICA Y MECÁNICA ESTADÍSTICA II": { day: 4 },
            "MECÁNICA CUÁNTICA II": { day: 2 },
            },
        5: {
            "FÍSICA DEL ESTADO SÓLIDO": { day: 4 },
            "ESPECIALIDAD": { day: 5 },
            "FÍSICA CONTEMPORÁNEA": { day: 2 },
            }, 
    },
    hidrometeorologia: {
        1: {
            "INTRODUCCIÓN A LA ATMÓSFERA": { day: 1 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "ANÁLISIS MATEMÁTICO II": { day: 4 },
            "ÁLGEBRA LINEAL": { day: 1 },
            },
        2: {
            "ANÁLISIS MATEMÁTICO III": { day: 3 },
            },
        3: {

        },
        4: {

            },
        5: {

            }, 
    },
    pmatematica: {
        1: {
            "ÁLGEBRA I": { day: 1 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "ÁGEBRA II": { day: 1 },
            "ANÁLISIS MATEMÁTICO II": { day: 4 },
            },
        2: {
            "ANÁLISIS MATEMÁTICO III": { day: 4 },
            "ELEMENTOS DE FÍSICA": { day: 1 },
            "COMPLEMENTOS DE ÁLGEBRA LINEAL": { day: 1 },
            "GEOMETRÍA I": { day: 3 },
            },
        3: {
            "COMPUTACIÓN": { day: 3 },
            "DIDÁCTICA ESPECIAL Y TALLER DE MATEMÁTICA": { day: 2 },
            "ELEMENTOS DE FUNCIONES COMPLEJAS": { day: 3 },
            "GEOMETRÍA II": { day: 4 },
            "INTRODUCCIÓN A PROBABILIDAD Y ESTADÍSTICA": { day: 1 },
        },
        4: {
            "ELEMENTOS DE FUNCIONES REALES": { day: 1 },
            "ELEMENTOS DE TOPOLOGÍA": { day: 3 },
            "SEMINARIO: FORMADOR DE FORMADORES": { day: 5 },
            },
        5: {
            }, 
        6: {
            "OPTATIVAS": { day: 5 },
        }, 
    },
    pfisica: {
        1: {
            "ÁLGEBRA I": { day: 1 },
            "ANÁLISIS MATEMÁTICO I": { day: 3 },
            "ÁGEBRA II": { day: 1 },
            "ANÁLISIS MATEMÁTICO II": { day: 4 },
            "FÍSICA GENERAL I": { day: 2 },
            "INTRODUCCIÓN A LA FÍSICA": { day: 4 },
            },
        2: {
            "COMPLEMENTOS DE ANÁLISIS MATEMÁTICO": { day: 2 },
            "FÍSICA GENERAL II": { day: 1 },
            "FÍSICA GENERAL III": { day: 3 },
            },
        3: {
            "COMPUTACIÓN": { day: 3 },
            "DIDÁCTICA ESPECIAL Y TALLER DE FÍSICA": { day: 2 },
            "FÍSICA GENERAL IV": { day: 5 },
            "MECÁNICA CLÁSICA": { day: 3 },
            "INTRODUCCIÓN A PROBABILIDAD Y ESTADÍSTICA": { day: 1 },
        },
        4: {
            "FÍSICA MODERNA": { day: 2 },
            "SEMINARIO: FORMADOR DE FORMADORES": { day: 5 },
            },
        5: {
            }
    }
};



// Function to load the subject options according to the selected year
function loadSubjects() {
    const selectedCareer = document.getElementById("career").value;
    const selectedYear = document.getElementById("year").value;
    const subjects = ExamdatesByCareer[selectedCareer]?.[selectedYear];
    const subjectSelect = document.getElementById("subject");

    subjectSelect.innerHTML = "";

    if (subjects) {
        for (let subject in subjects) {
            const option = document.createElement("option");
            option.value = subject;
            option.text = subject;
            subjectSelect.appendChild(option);
        }
    }
}


// Call loadSubjects() initially to display the subjects of the selected year by default
window.onload = loadSubjects;

function calculateDatesExam() {
    const selectedCareer = document.getElementById("career").value;
    const selectedYear = document.getElementById("year").value;
    const selectedSubject = document.getElementById("subject").value;
    const result = document.getElementById("result");
    result.innerHTML = "";

    const dayExamen = ExamdatesByCareer[selectedCareer]?.[selectedYear]?.[selectedSubject]?.day;

    if (dayExamen !== undefined) {
        let dateCounter = 1;
        startDates.forEach((fechaInicio, index) => {
            if (index === 0) {
                result.innerHTML += "<h3>Exámenes febrero</h3>";
                dateCounter = 1;
            } else if (index === 2) {
                result.innerHTML += "<h3>Exámenes julio/agosto</h3>";
                dateCounter = 1;
            } else if (index === 5) {
                result.innerHTML += "<h3>Exámenes diciembre</h3>";
                dateCounter = 1;
            }

            const examDate = new Date(fechaInicio);
            examDate.setDate(fechaInicio.getDate() + dayExamen);

            const day = examDate.getDate().toString().padStart(2, '0');
            const month = (examDate.getMonth() + 1).toString().padStart(2, '0'); 
            const year = examDate.getFullYear();

            result.innerHTML += `<p><strong>Llamado ${dateCounter}:</strong>  ${day}/${month}/${year}</p>`;
            dateCounter++; 
        });
    } else {
        result.innerText = "Por favor, selecciona una materia válida y ponete a estudiar ;)";
    }

    result.style.display = "block";
}



