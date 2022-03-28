//Funciones de orden superior. Principio: Separación de responsabilidades.
//una función === una tarea

/*EJ: Para buscar datos de una API creamos una función que hace un fetch
esto de orden superior no tiene nada...
 */

const url = "https://jsonplaceholder.typicode.com/posts"
const fetchData = async(url) => {
    const rawData = await fetch(url);
    const parsedData = await rawData.json();
    console.log(parsedData)
}
fetchData(url)      
    /////////////
    /* En el paradigma funcional podemos pasarle una función a otra como parámetro. Entonces haremos una función de orden superior (getData), que recibirá datos de una API con fetch. getData recibirá como parámetros la url y una función de primer orden como callback. Con esto logramos mayor abstracción, esto quedará claro un poco más adelante */

async function getData(url, callback) {
    const rawData = await fetch(url)
    const parsedData = await rawData.json();
    callback(parsedData);
};

function printOnConsole(data) {
    console.log(data)
}

getData(url, printOnConsole)
    /////////////////////
function renderData(data) {
    let htmlContent = "";
    data.forEach(el => {
        htmlContent += `<div>ID: ${el.id} - Title: ${el.title}</div><br/>`;
    });
    dataContainer.innerHTML = htmlContent;
}
// getData(url, renderData)


/* "Una clausura o closure es una función que guarda referencias del estado adyacente (ámbito léxico). En otras palabras, una clausura permite acceder al ámbito de una función exterior desde una función interior. En JavaScript, las clausuras se crean cada vez que una función es creada". MDN */

function renderDataWithClosure(htmlElement) {

    return (content) => {
        //esto no se ejecuta acá sino que se retorna la función lista para ejecutar
        let htmlContent = "";
        content.forEach((el) => {
            htmlContent += `<div>ID: ${el.id} - Title: ${el.title}</div> <button>Aceptar</button><br/>`;
            
        });
        htmlElement.innerHTML = htmlContent;
    };
}
// getData(url, renderDataWithClosure(myDiv))



function renderDataWithClosureBetter(htmlElement, a, b) {
    return (content) => {
        let htmlContent = "";
        let id = new Set();       

        content.forEach((el) => {

            htmlContent += `
            <div>ID: ${el[a]} - Title: ${el[b]} 
            <button class="btn btn-warning">Eliminar id ${el[b]}</button>
            <button class="btn btn-danger">Actualizar ${el[b]}</button>            
            </div> <br/>`;

        })
        htmlElement.innerHTML = htmlContent
    }
}


getData(url, renderDataWithClosureBetter(myOtherDiv, "userId", "id"))