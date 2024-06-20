// Importamos el componenete que hemos creado en Header.jsx
import { useState, useEffect } from 'react' //importamos useState y useEffect
import Header from "./components/Header"//importar componente
import Guitar from "./components/Guitar"//importar componente
import { db } from './data/db'// importamos el array de guitarras
// componente
function App() {
   console.log(db)//mostramos el array de guitarras

    // De esta forma tenemos un carrito persistente sin perder los datos en el carrito cuando recargamos la página. 
   // Con esta variable comporbaremos si hay algo en localStorage, si hay algo lo convertimos en un array y si no lo iniciamos con un array vacío
   const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
   }

   const[data] = useState(db)//use state de la base de datos de guitarras (array de objetos)
   const[cart, setCart] = useState(initialCart) //use state del carrito de compras

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    // Este use effect es para cada vez que cambie el estado de cart se almacenará automáticamente los nuevos cambios en localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))//IMPORTANTE: como nuestro carrito cart es un array lo convertimos a string con JSON.stringify
    }, [cart])//este es nuestro arreglo de dependencias, cada vez que el estado de cart cambie ejecutaríamos el codigo dentro del useEffect

   function addToCart(item) {
    // Vamos a revisar si un elemento existe o no en el carrito para poder agregar varios,  importante no usar métodos que modifiquen el state, por ejemplo .push muta el original, se tiene que usar por ejemplo .map que retorna un array nuevo
    const itemExist = cart.findIndex(guitar => guitar.id === item.id )
    console.log(itemExist)
    // De esta forma conseguimos que no se agreguen múltiples guitarras al hacer click, sólo se agrega una, esto se controlará después con un contador de cantidad
    if(itemExist >=0) {//existe en el carrito
        if(cart[itemExist].quantity >= MAX_ITEMS) return
        console.log('Ya existe...')
        // INCREMENTAMOS LA CANTIDAD DE QUANTITY AL PULSAR EN UNA MISMA GUITARRA:
        // Creamos una copia del carrito para no mutar el state MUY IMPORTANTE ESTA PARTE
        const updatedCart = [...cart]//[...cart]copia del carrito utilizando el spread Operator
        // Una vez tengo la copia, puedo modificar la copia sin modificar el state original, es una copia del state cart
        // a updatedCart le pasamos la posición que es itemExist y luego quantity ++
        updatedCart[itemExist].quantity ++
        // Después de escribir en el carrito seteamos los cambios con la función setCart para realizar lo cambios.
        setCart(updatedCart)
    }else{
        console.log('No existe...Agregando...')
        item.quantity = 1 //agregamos una propiedad nueva al objeto que es quantity para almacenar la cantidad
        setCart([...cart, item])//crea una copia si no existe y la agrega
    }
    saveLocalStorage() // Una vez agregamos un producto al carrito o lo actualizamos llamaremos a la función para almacenar todo lo que hay en localstorage
   }
   
    // En React, cuando usas el hook useState, tienes dos maneras principales de actualizar el estado con la función setCart
    // Cuando llamas a setCart, puedes proporcionar una nueva lista de artículos directamente, o puedes pasar una función. Esta función recibe el estado anterior (en este caso, prevCart) y devuelve el nuevo estado.
    // función par eliminar elementos del carrito de compras , crearemos la función aquí y la pasaremos via props a nuestro componente
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    // Function para aumentar la cantidad de guitarras(+)
    function increaseQuantity(id) {
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item, //retornamos  un copia de el resto de elementos del carrito
                    quantity: item.quantity + 1 //retornamos la nueva cantidad después de añadir una nueva guitarra
                }
            }
            return item // para mantener el resto d elementos a los que no de clic
        })
        setCart(updateCart)//seteamos el carrito y le pasamos la variable que almacena el nuevo array de objetos con los nuevos cambios en el carrito
        console.log('res', updateCart)
    }

    // Function para disminuir la cantidad de guitarras(+)
    function decreaseQuantity(id) {
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return{
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item //si nose cumple la condición retorno el resto de elementos de mi carrito, por eso este segundo return
        })
        setCart(updateCart)
    }

    // Función para vaciar el carrito de compras
    function clearCart() {
        setCart([])
    }

    // Función para almacenar las guitarras añadidas al carrito en el localstorage, El local Storage es una característica del navegador web que permite almacenar datos de manera persistente
    // Características de Local Storage:
    // No soporta tipos de datos numéricos, ni arreglos, ni objetos. Solo podemos almacenar cadenas de texto. localStorage. setItem() guarda los datos
    // Para almacenar información en el local storage, se usa en el método setItem() . Este método lleva dos argumentos, un clave y un valor. Si la clave no existe en el local storage, el método setItem() va a crear una nueva clave y asignarle el valor dado
    // function saveLocalStorage() {
    //     localStorage.setItem('cart', JSON.stringify(cart))//IMPORTANTE: como nuestro carrito cart es un array lo convertimos a string con JSON.stringify
    // }
    // * El state de React es asíncrono, lo que significa que el state no se actualiza inmediatamente tarda unos milisegundos para soluciona esto en lugar de usar una function como la de arriba oculta usaremos un useefect


  return (
    <>
     {/* Ahora vamos a reenderizar el componente importado para poder visualizarlo */}
    <Header 
        // le pasamos el carrito a nuestro header para poder interactuar con el, le pasamos props al componente:
        cart = {cart}
        removeFromCart = {removeFromCart} //removeFromCart es el prop y le pasamos la función
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
    /> 

    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {/* Vamos a iterar sobre todas las guitarras con un map y crear un nuevo array  */}
            {data.map((guitar) => (
                    // Vamos a pasarle algunos props a este componente
                    <Guitar 
                        key = {guitar.id}//prop especial que siempre hay que utilizar cuando se itera en una lista, como este caso de las guitarras
                        guitar={guitar}//prop de la guitarra
                        cart={cart}
                        setCart = {setCart}
                        addToCart={addToCart}
                    />
                ))}
           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App

// *REACT HOOKS:

// React Hooks: Tanto los Hooks como los Componentes son la parte más importante de React
//    Los Hooks son la base de React. permiten utilizar las diferentes funciones de React en los componentes
//    react tiene una serie de Hooks pero también se pueden crear los propios hooks, están disponibles desde
//    la versión 16.8 de React, previo a ello se tenían que crear Classes para crear y modificar el state,
//    con  los Hooks no es necesario.    
//    Los Hooks se dividen en Básicos y Adicionales

// Hooks disponibles en React:

    /*
    -Básicos y más utilizados:
    
      useState
      useEffect
      useContext
      
    --------------------------

      useReducer
      useCallback
      useMemo
      useRef
      useImpreativeHandle
      useLayoutEffect
      useInsertionEffect
      useTransition
      useDeferredValue
      useId
      useSyncExternalStore */ 

    // * State: o estado en React (es la pieza más importante de React)
    /*
     El estado es una variable con información relevante en nuestra aplicación de React, algunas
     veces el state pertenece a un componente en específico o algunas veces deseas compartirlo
     a lo largo de diferentes componentes
     
     piensa en el state como el resultado de alguna interacción en el sitio o aplicación web:
     El listado de clientes, la imagen a mostrar en una galería, si un usuario está autenticado o no.

     El state es creado con el hook de useState()
     
     El estado es un objeto que contiene datos que pueden cambiar en el tiempo. En React, el estado se usa para controlar los cambios en la interfaz.
     
     1º Lo primero será importar el hook de useState
     
     Dentro de la ventana de desarrollador tenemos componets gracias a haber instalado la extensión react developer tools
     en Components se muestra el arbol de componentes de nuestra aplicación

    //* useState: es un Hook de React que te permite agregar una variable de estado a tu componente.
     
     * Reglas de los hooks:
     
     -Los Hooks se colocan en la parte superior de tus componentes de React (antes de return)
     -No se deben colocar dentro de condicionales, tampoco depués de un return
     
     * useEffect:El hook useEffect se usa para ejecutar código cuando se renderiza el componente o cuando cambian las dependencias del efecto. Recibe dos parámetros: 
     La función que se ejecutará al cambiar las dependencias o al renderizar el componente.

     Después de useState es el más utilizado

     useEffect siempre en un callback, que dependiendo como lo declares va a realizar diferentes acciones

     -usos de useEffect:
      Al ejecutarse automáticamente cuenado el componente esta listo, es un buen lugar para colocar código para
      consultar una API O LocalStorage

      Debido a que le podemos pasar una dependencia y estar escuchando por los cambios que sucedan en una variable, 
      puede actualizar el componente cuando ese cambio suceda.

      Dependiendo del valor que pasemos en el array de dependencias (o no pasemos nada) el hook de useEffect hará algo diferente.

     */ 

      