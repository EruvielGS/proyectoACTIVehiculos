
        const canvas = document.getElementById("damage-canvas");
        const ctx = canvas.getContext("2d");
        const carImage = document.getElementById("car-image");
        const addMarkButton = document.getElementById("add-mark-button");
        const removeMarkButton = document.getElementById("remove-mark-button");
        const clearMarksButton = document.getElementById("clear-marks-button");
        const loadDamagesButton = document.getElementById("load-damages-button");
        const damageCoordinatesInput = document.getElementById("damage-coordinates");
        let marks = [];

        // Agregar manejadores de clic a los botones
        addMarkButton.addEventListener("click", () => toggleMode("add"));
        removeMarkButton.addEventListener("click", () => toggleMode("remove"));
        clearMarksButton.addEventListener("click", clearMarks);
        loadDamagesButton.addEventListener("click", loadDamages);
        document.getElementById("damage-form").addEventListener("submit", function (e) {
            e.preventDefault();
            sendCoordinates();
        });

        // Inicializar el canvas para que tenga el mismo tamaño que la imagen
        canvas.width = carImage.width;
        canvas.height = carImage.height;

        // Función para dibujar las marcas (equises) en el canvas
        function drawMarks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;

            marks.forEach((mark) => {
                ctx.beginPath();
                ctx.moveTo(mark.x - 10, mark.y - 10);
                ctx.lineTo(mark.x + 10, mark.y + 10);
                ctx.moveTo(mark.x - 10, mark.y + 10);
                ctx.lineTo(mark.x + 10, mark.y - 10);
                ctx.stroke();
            });
        }

        // Cambiar el modo (Agregar o Eliminar) de marcado
        function toggleMode(mode) {
            if (mode === "add") {
                addMarkButton.classList.add("active-button");
                removeMarkButton.classList.remove("active-button");
                canvas.removeEventListener("click", removeMark);
                canvas.addEventListener("click", addMark);
            } else if (mode === "remove") {
                removeMarkButton.classList.add("active-button");
                addMarkButton.classList.remove("active-button");
                canvas.removeEventListener("click", addMark);
                canvas.addEventListener("click", removeMark);
            }
        }

        // Agregar una marca al hacer clic en la imagen
        function addMark(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            marks.push({ x, y });
            drawMarks();
            updateCoordinatesInput();
        }

        // Eliminar una marca si se hace clic en ella
        function removeMark(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            marks = marks.filter((mark) => {
                const distance = Math.sqrt((x - mark.x) ** 2 + (y - mark.y) ** 2);
                return distance >= 10;
            });

            drawMarks();
            updateCoordinatesInput();
        }

        // Borrar todas las marcas del canvas
        function clearMarks() {
            marks = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateCoordinatesInput();
        }

        // Actualizar el valor del campo de coordenadas oculto
        function updateCoordinatesInput() {
            damageCoordinatesInput.value = JSON.stringify(marks);
        }

        const data = {coordenadas: marks}
        // Enviar las coordenadas al servidor utilizando Fetch
        function sendCoordinates() {
            //const formData = new FormData(document.getElementById("damage-form"));
            
            fetch("http://localhost:3010/entry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        // Cargar las coordenadas desde la API y dibujar las marcas
        function loadDamages() {
            // Realiza una solicitud GET a la API para obtener las coordenadas
            fetch("http://localhost:3010/entry", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    // data contendrá las coordenadas obtenidas de la API
                    marks = data;
                    drawMarks();
                    updateCoordinatesInput();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        // Inicialización
        toggleMode("add"); // Inicialmente, modo de agregar activado
    