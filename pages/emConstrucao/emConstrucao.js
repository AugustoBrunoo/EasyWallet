// Retornar à página anterior 

const btnVoltar = document.querySelector("#btnVoltar");

btnVoltar.addEventListener("click", () => {
    history.back();
})