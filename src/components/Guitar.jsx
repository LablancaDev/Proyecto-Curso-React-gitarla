// Creo el componente para una de las guitarras 
export default function Guitar({guitar, cart, addToCart}) {

    // Hacemos destucturing
    const {id, name, image, description, price } = guitar  


    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    // Vamos a agregar el evento onclick a las guitarras para gregarlas al carrito
                    onClick={() =>  addToCart(guitar)}//le pasamos el objeto completo con toda la info, hay que pasarle un callback para que no llame a la función sin esperar a que suceda el evento click
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}