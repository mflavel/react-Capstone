import restauranfood from "./images/restauranfood.jpg";
import greaksalad from "./images/greeksalad.jpg";
import bruchetta from "./images/bruchetta.svg";
import lemondesser from "./images/lemondessert.jpg";
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <div className="hero">
                <div className="site-inner">
                    <div className="hero-text" id="text">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <Link to="/reservations"><button className="reserve-btn">Reserve a Table</button></Link>
                    </div>
                    <div className="hero-image" id="resteraunt-image">
                        <img src={restauranfood} alt="restaurant food" />
                    </div>
                </div>
            </div>
            <div className="hstack" justifyContent="space-between" alignItems="center" padding="1rem 5rem" margin="2rem 0">
                <h1 className="specials-title"><b>This Week Specials!</b></h1>
                <Link to="/menu"><button className="reserve-btn"><b>Online Menu</b></button></Link>
            </div>
            <section className="specials-grid">
                <article className="specials" id="Greek Salad">
                    <div className="vstack">
                        <img src={greaksalad} alt="Greek Salad" />
                        <div className="hstack">
                            <h3>Greek Salad</h3>
                            <h4>$12.99</h4>
                        </div>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </div>
                </article>
                <article className="specials" id="Bruchetta">
                    <div className="vstack">
                        <img src={bruchetta} alt="Bruchetta" />
                        <div className="hstack">
                            <h3>Bruchetta</h3>
                            <h4>$5.99</h4>
                        </div>
                        <p>Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </div>
                </article>
                <article className="specials" id="Lemon Desser">
                    <div className="vstack">
                        <img src={lemondesser} alt="Lemmon Dessert" />
                        <div className="hstack">
                            <h3>Lemon Dessert</h3>
                            <h4>$5.00</h4>
                        </div>
                        <p>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </div>
                </article>
            </section>

        </>)
}
export default Main;
