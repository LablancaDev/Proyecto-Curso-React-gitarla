// * COMPONENTE

// * IMPORTAMOS LIBRERÍAS Y COMPONENTES:

// importamos Fragment de la librería de React
import { Fragment } from "react"
import Guitar from "./Guitar"
import {useMemo} from 'react' //importamos el hook de useMemo de react:
// El hook useMemo en React es una herramienta que nos permite memorizar (almacenar en caché) el valor de una función determinada. Esto significa que si los valores de las dependencias de la función no cambian, entonces el valor memorizado se devuelve en lugar de volver a ejecutar la función
// Podemos implementarlo en las funciones que queramos y lo requieran, no se utiliza siempre, es para mejorar el performance

//Ahora lo importaremos en el archivo App.tsx 
// Un componente es una función, un componente siempre debe de tener un return:
// El código que esté dentro del return es lo que se va a mostrar en pantalla, que será código HTML y Javascript
 export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}) {
    // *State es donde va el código JAVASCRIPT
    // Código Javascript:
    // const name = 'David'
    // const total = 20

    // State Derivado: esta función revisará si el carrito tiene algo(retornará true o false )
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    // Calcular el total a pagar (usaremos el array method de reduce)(toma dos parametro el total o acumulado y el item que es el elemento actual(cada una de las guitarras añadidas al carrito))
    const cartTotal = useMemo( () => cart.reduce((total, item) => total +  (item.quantity * item.price), 0), [cart]) //0 valor inicial desde donde empezamos a sumar
        
    return ( //sólamente se puede retornar un elemento como regla de jsx, puedo colocar un div y mover todo dentro
    // * HTML/VISTA
        // <Fragment>
        //     <h1>Hola: {name}</h1> 
        //     <p>El total es: {total}</p>
        // </Fragment>//mediante las llaves { } usamos la variable

        // * AL FINAL ESTE COMPONENTE SE ENCARGA DE CONTENER EL HEADER, LO DEMÁS SON PRUEBAS Y COMENTARIOS
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {/* Vamos a introducir un ternario(no se pueden poner if en la parte del template) 
                            lo necesitamos para mostrar el mensaje cuando el carrito esta vacío o no, creamos una llamada a la función que contiene la logica por fuera, unas líneas más arriba donde se declara la función*/}
                            {isEmpty ?(
                                // Si el carrito está vacío mostramos el mensaje
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                            <>
                                 {/* Y si el carrito no está vacío mostramos la tabla con las guitarras añadidas */}
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {/* Iteramos con un map sobre la tabla entera de manera que ejecutará el código una vez por cada elemento en el carrito */}
                                    {cart.map(guitar =>(
                                        // pasamos el id para que desaparezca el error en la consola de estas creando una lista pero no hay un key único se refire al id al estar iterando
                                        // siempre que se itere por ejemplo utilizando un .map hay que colocar un key = un id, como en la siguiente línea agregará un registro único a cada elemento y se evitarán registros duplicados 
                                    <tr key={guitar.id}>
                                        <td>
                                            <img 
                                            className="img-fluid" 
                                            src={`/img/${guitar.image}.jpg`} 
                                            alt="imagen guitarra" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                {guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={ () => decreaseQuantity(guitar.id)}
                                            >
                                                -
                                            </button>
                                                {guitar.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => increaseQuantity(guitar.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                // ¿Por Qué Usar una Arrow Function?
                                                /*Si escribes onClick={removeFromCart(guitar.id)}, esta expresión ejecutará removeFromCart inmediatamente cuando el componente se renderice, 
                                                en lugar de esperar a que ocurra el evento de clic. Esto es porque estás llamando a la función en lugar de pasar una referencia a la función.
                                                
                                                Usar una función de flecha onClick={() => removeFromCart(guitar.id)} crea una nueva función que envuelve la llamada a removeFromCart(guitar.id). Esta nueva función solo se ejecutará cuando ocurra el evento de clic.*/
                                                onClick={() => removeFromCart(guitar.id)}//con el callback identificamos que elemento (id) estamos presionando para eliminarlo de nuestro carrito
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                       
                            <p className="text-end">Total pagar: <span className="fw-bold">{cartTotal}</span></p>
                            </>
                            )}
                            <button 

                            className="btn btn-dark w-100 mt-3 p-2" 
                            onClick={clearCart}
                            >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}
// Ya está creado el componente, ahora hay que exportarlo e importarlo para poder visualizarlo
// con export default en la function lo exportamos, también se puede hacer de esta forma:
// export default Header;


// como solo se puede poner un elemento y poner un div puede generar muchos divs innecesarios
// se pueden utilizar fragmentes <> existen dos tipos de crear fragments en React, hay que importarlo 
// primero de la librería de React


// La otra forma es importar React de esta manera:
    // import React from 'react'
    // y en el componente escribirlo así:
    // <rect.Fragment>

    // </rect.Fragment>

    // *otra de las formas es no importar Fragment y introducir el código en el componente entre: '<>' (es una muy buena opción)
    // <>

    // </>



/* JSX:
    Sintáxis especial para poder agregar HTML Y Javascript en el mismo archivo

    Es una extensión del lenguaje desarollada por Meta para React
    Parece JS pero muestra código de HTML, y básicamente es un lenfujae de Templates/Vistas
    que muestra el HTML pero tiene todas las funciones de Javascript*/