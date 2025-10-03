import { HStack, VStack } from "@chakra-ui/react";
import logo from "./images/Logo .svg";


const Footer = () => {
    return (
        <footer className="site-footer">
            <HStack spacing="24px" className="site-inner">
                <img src={logo} alt="Logo" />
                <VStack>
                    <h2>Doormat Navigation</h2>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/menu">Menu</a>
                    <a href="/reservations">Reservations</a>
                    <a href="/order-online">Order Online</a>
                    <a href="/login">Login</a>
                </VStack>
                <VStack>
                    <h2>Contact</h2>
                    <p>1234 Lemon St.</p>
                    <p>Chicago, IL 60601</p>
                    <p>(123) 456-7890</p>
                </VStack>
                <VStack>
                    <h2>Social Media Links</h2>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </VStack>
            </HStack>
        </footer>)
}
export default Footer;