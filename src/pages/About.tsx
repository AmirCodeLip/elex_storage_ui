import * as React from "react";

const About: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>About Us</h1>
            <p>
                Welcome to our website! We are dedicated to providing the best services and products for our customers.
            </p>
            <p>
                Our mission is to make the world a better place through innovation and passion. Stay connected with us for more updates!
            </p>
        </div>
    );
};

// Inline CSS Styles (Optional)
const styles = {
    container: {
        textAlign: "center" as const,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
};

export default About;
