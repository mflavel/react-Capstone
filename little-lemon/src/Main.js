import restauranfood from "./images/restauranfood.jpg";
import greaksalad from "./images/greeksalad.jpg";
import bruchetta from "./images/bruchetta.svg";
import lemondesser from "./images/lemondessert.jpg";
import { VStack, HStack } from '@chakra-ui/react';
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
            {/* Menu Specials */}
            <HStack justifyContent="space-between" alignItems="center" padding="1rem 5rem" margin="2rem 0">
                <h1 className="specials-title"><b>This Week Specials!</b></h1>
                <Link to="/menu"><button className="reserve-btn"><b>Online Menu</b></button></Link>
            </HStack>
            <section className="specials-grid">
                <article className="specials" id="Greek Salad">
                    <VStack>
                        <img src={greaksalad} alt="Greek Salad" />
                        <HStack>
                            <h3>Greek Salad</h3>
                            <h4>$12.99</h4>
                        </HStack>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
                <article className="specials" id="Bruchetta">
                    <VStack>
                        <img src={bruchetta} alt="Bruchetta" />
                        <HStack>
                            <h3>Bruchetta</h3>
                            <h4>$5.99</h4>
                        </HStack>
                        <p>Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
                <article className="specials" id="Lemon Desser">
                    <VStack>
                        <img src={lemondesser} alt="Lemmon Dessert" />
                        <HStack>
                            <h3>Lemon Dessert</h3>
                            <h4>$5.00</h4>
                        </HStack>
                        <p>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
            </section>

        </>)}

export default Main;

