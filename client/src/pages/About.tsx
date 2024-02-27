import React from 'react'
import fruitPlatter from "../assets/about-bg.jpg";

const About = () => {
  return (
    <div className='about-container'>
        <h1 className='about-header-text'>ABOUT</h1>
        <div className="about-description-container">
            <div className="about-description-l-wrapper">
            </div>
            <div className="about-description-r-container">
                <div className='about-description-text-container'>
                    <p><span>The Verdant Grove:</span> Where Nature's Bounty Yields Exquisite Delights</p>
                    <p>More than just a fruit purveyor, we are storytellers. Each piece we offer whispers tales of sun-kissed orchards, passionate growers, and the meticulous care that yields exceptional quality. We believe in showcasing the inherent beauty and flavor of nature, offering an experience that transcends the mundane.</p>
                </div>
                <div className='about-description-contact-container'>
                    <p className='about-contact-l'><span>"From Grove to Grove, Savor the Flavors of Nature."</span> <br/>Embark on a journey through our verdant haven, where nature's bounty unfolds in every bite.</p>
                    <div className="about-contact-r">
                        <p>The Verdant Grove</p>
                        <p>123 Fruit St</p>
                        <p>Auckland</p>
                        <p>New Zealand</p>
                        <p>info@verdantgrove.com</p>
                    </div>
                </div>
            </div>
        </div>
        <img alt='Fruit Platter' src={fruitPlatter} width={"100%"} height={"100%"}/>
    </div>
  )
}

export default About