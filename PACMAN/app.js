document.addEventListener("DOMContentLoaded", () => {  //crear una funció sense nom de manera més ràpida i curta

    const scoreDisplay = document.getElementById("score"); //selecciona els elements que siguin score
    const lvlDispaly = document.getElementById("level"); //selecciona els elements que siguin score
    const grid = document.querySelector('.grid') //selecciona el que té classe grid
    const width = 28; //tamany
    let score = "";
    let pacmanIndex = "";
    let level = "";
    const addButtonEl = document.getElementById("boto");

    // 0 = puntets
    // 1 = muro
    // 2 = fantasma
    // 3 = poder
    // 4 = buit

    const layout = [ // 28 x 28 = 784
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const layout2 = [ 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 3, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 3, 0, 0, 0, 4, 1, 1, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 4, 1, 1, 4, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const layout3 = [ 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 3, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 4, 4, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 4, 4, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
        1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1,
        1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
        0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 4, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 4, 4, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 4, 4, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 3, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    const cuadrados = []; //crea un array que posarà tots els quadres dins el tablero

    // CREAR TABLERO - bucle que recorre el layout
    function createBoard(layout) {
            
            for (let i = 0; i < layout.length; i++) {

                const cuadro = document.createElement('div'); //crea els elements
                cuadro.id = i;
                grid.appendChild(cuadro);

                cuadrados.push(cuadro);

                if (layout[i] === 0) { //si el nombre és aquest, s'afegeix a aquesta classe
                    cuadrados[i].classList.add("puntets")
                }

                if (layout[i] === 1) {
                    cuadrados[i].classList.add("muro")
                }

                if (layout[i] === 2) {
                    cuadrados[i].classList.add("fantasma")
                }

                if (layout[i] === 3) {
                    cuadrados[i].classList.add("poder")
                }
        }
    }

    createBoard(layout);

    level = 1;
    lvlDispaly.innerHTML = level;

    //CREAR PACMAN
    pacmanIndex = 490;
    cuadrados[pacmanIndex].classList.add('pac-man');

    //MOURE EL PACMAN AMB LES TECLES
    function movePacman(tecla) {
        cuadrados[pacmanIndex].classList.remove('pac-man');

        if (tecla.key === 'ArrowUp' && !cuadrados[pacmanIndex - width].classList.contains('muro')) {
            pacmanIndex -= width
        }

        if (tecla.key === 'ArrowDown' && !cuadrados[pacmanIndex + width].classList.contains('muro')) {
            pacmanIndex += width
        }

        if (tecla.key === 'ArrowLeft' && !cuadrados[pacmanIndex - 1].classList.contains('muro')) {
            pacmanIndex -= 1
            if (pacmanIndex == 364) {  // == comparar
                pacmanIndex = 391    // = asignar valor
            }
        }

        if (tecla.key === 'ArrowRight' && !cuadrados[pacmanIndex + 1].classList.contains('muro')) {
            pacmanIndex += 1
            if (pacmanIndex == 391) {  // == comparar
                pacmanIndex = 364    // = asignar valor
            }
        }

        cuadrados[pacmanIndex].classList.add('pac-man');

        comePipas();
        superPoder();
        win();
        gameOver();

        //QUE EL PACMAN ES MENGI ELS PUNTETS 
        function comePipas() {
            if (cuadrados[pacmanIndex].classList.contains('puntets')) {
                score++;
                scoreDisplay.innerHTML = score;
                cuadrados[pacmanIndex].classList.remove('puntets')
            }
        }

        //QUE EL PACMAN ES MEGI EL PODER
        function superPoder() {
            if (cuadrados[pacmanIndex].classList.contains('poder')) {
                score += 10;
                scoreDisplay.innerHTML = score;

                ghosts.forEach(fantasma => fantasma.asustat = true);
                setTimeout(relax, 10000);

                cuadrados[pacmanIndex].classList.remove('poder')
            }
        }
    }

    function relax() {
        ghosts.forEach(f => f.asustat = false);
    }

    //CREAR FANTASMES
    class Ghost {
        constructor(className, startIndex, vel) {
            this.className = className;
            this.startIndex = startIndex;
            this.vel = vel;
            this.ghostIndex = startIndex;
            this.asustat = false;
            this.timerId = NaN
        }
    }

    ghosts = [
        new Ghost('paco', 348, 250),
        new Ghost('paca', 351, 400),
        new Ghost('pepe', 379, 500),
        new Ghost('pepa', 376, 300),
        new Ghost('kibili', 457, 150)
    ]

    ghosts.forEach(ghost => {
        cuadrados[ghost.ghostIndex].classList.add(ghost.className);
        cuadrados[ghost.ghostIndex].classList.add('ghost');
    });

    ghosts.forEach(ghost => moveGhost(ghost));

    // FER MOURE ELS FANTASMES
    function moveGhost(ghost) {
        const directions = [1, -1, width, -width]

        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function () {

            if (!cuadrados[ghost.ghostIndex + direction].classList.contains('muro')
                && !cuadrados[ghost.ghostIndex + direction].classList.contains('ghost')) {

                cuadrados[ghost.ghostIndex].classList.remove(ghost.className, 'ghost', 'fasustado');
                ghost.ghostIndex += direction;
                cuadrados[ghost.ghostIndex].classList.add(ghost.className, 'ghost');
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)]
            }

            //condicions dels fantasmes
            if (ghost.asustat) {
                cuadrados[ghost.ghostIndex].classList.add('fasustado');
            }

            // si el pacman choca amb el fantasma asustat
            if (ghost.asustat && cuadrados[ghost.ghostIndex + direction].classList.contains('pac-man')) {
                cuadrados[ghost.ghostIndex].classList.remove('fasustado', 'ghost', ghost.className);
                ghost.ghostIndex = ghost.ghostIndex;
                ghost.asustat = false;
                //score += 100
                scoreDisplay.innerHTML = score;
                cuadrados[ghost.ghostIndex].classList.add('ghost', ghost.className);
            }

            gameOver();
        }, ghost.vel);
    }

    document.addEventListener('keydown', movePacman); // no haver de clicar cada vegada per moure el mapa
    // 'keyup' = clicar cada vegada per moure el pacman

    function gameOver() {
        if (cuadrados[pacmanIndex].classList.contains('ghost') &&
            !cuadrados[pacmanIndex].classList.contains('fasustado')) {
            ghosts.forEach(f => clearInterval(f.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function () {
                alert("Has perdut");
            }, 500)
        }
    }

    //CANVIAR DE PANTALLES
    function win() {
        if (score == 274){
            ghosts.forEach(f => clearInterval(f.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function () {
                alert("Has completet el nivell");

                //borrar el tablero anterior i posar el nou
                cuadrados.forEach(c =>{
                    c.classList=""
                })

                level = 2;
                lvlDispaly.innerHTML = level;

                //pintar pacman
                pacmanIndex = 309;
                cuadrados[pacmanIndex].classList.add('pac-man');

                //pintar fantasmes
                ghosts.forEach(ghost => {
                    cuadrados[ghost.ghostIndex].classList.add(ghost.className);
                    cuadrados[ghost.ghostIndex].classList.add('ghost');
                });

                ghosts.forEach(ghost => moveGhost(ghost));

                createBoard(layout2);
            }, 500)
        }else{
            if(score == 548){
                ghosts.forEach(f => clearInterval(f.timerId));
                document.removeEventListener('keyup', movePacman);
                setTimeout(function () {
                    alert("Has completat el nivell");

                    //borrar el tablero anterior i posar el nou
                    cuadrados.forEach(c =>{
                        c.classList=""
                    })

                    level = 3;
                    lvlDispaly.innerHTML = level;

                    //pintar pacman
                    pacmanIndex = 378;
                    cuadrados[pacmanIndex].classList.add('pac-man');

                    //pintar fantasmes
                    ghosts.forEach(ghost => {
                        cuadrados[ghost.ghostIndex].classList.add(ghost.className);
                        cuadrados[ghost.ghostIndex].classList.add('ghost');
                    });

                    ghosts.forEach(ghost => moveGhost(ghost));

                    createBoard(layout3);
                    }, 500)
            }else{
                if(score == 822){
                    ghosts.forEach(f => clearInterval(f.timerId));
                    document.removeEventListener('keyup', movePacman);
                    setTimeout(function () {
                        alert("Has guanyat el joc");

                        //borrar el tablero anterior i posar el nou
                        cuadrados.forEach(c =>{
                            c.classList=""
                        })

                        score = 0;
                        scoreDisplay.innerHTML = score;

                        level = 1;
                        lvlDispaly.innerHTML = level;

                        //pintar pacman
                        pacmanIndex = 490;
                        cuadrados[pacmanIndex].classList.add('pac-man');

                        //pintar fantasmes
                        ghosts.forEach(ghost => {
                            cuadrados[ghost.ghostIndex].classList.add(ghost.className);
                            cuadrados[ghost.ghostIndex].classList.add('ghost');
                        });

                        ghosts.forEach(ghost => moveGhost(ghost));

                        createBoard(layout);
                        }, 500)
                }
            }
        }
    }

    //BOTÓ DE REINICIAR
    function reinicia(){

        //borrar el tablero anterior i posar el nou
        cuadrados.forEach(c =>{
            c.classList=""
        })
        
        score = 0;
        scoreDisplay.innerHTML = score;

        level = 1;
        lvlDispaly.innerHTML = level;

        pacmanIndex = 490;
        cuadrados[pacmanIndex].classList.add('pac-man');

        createBoard(layout);
    }

    addButtonEl.addEventListener("click", reinicia);
        
})