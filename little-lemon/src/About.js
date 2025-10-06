import { HStack } from "@chakra-ui/react";

const About = () => {
  return (
    <section className="about-us" id="about-section">
      <HStack className="about-us-inner" justifyContent="space-between">
        <div className="about-us-text">
          <h1 id="about-title">About Us</h1>
          <p>
            Welcome to Little Lemon, where we bring the flavors of the
            Mediterranean to your table. Our restaurant is a family-owned
            establishment that prides itself on using traditional recipes and
            fresh ingredients to create delicious dishes with a modern twist.
            Whether you're in the mood for a light salad or a hearty entree, our
            menu has something for everyone. We also offer a variety of
            vegetarian and gluten-free options to accommodate all dietary needs.
            Come dine with us and experience the taste of the Mediterranean in a
            warm and inviting atmosphere.
          </p>
        </div>
        <div className="about-us-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            alt="About Us"
          />
        </div>
      </HStack>
    </section>
  );
};
export default About;
