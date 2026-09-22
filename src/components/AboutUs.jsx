import React from 'react';

const AboutUs = () => {
  return (
    <section 
      id="about" 
      className="w-full min-h-screen flex items-start lg:items-center justify-end px-6 sm:px-8 lg:px-24 pt-54 sm:pt-28 lg:pt-0 bg-transparent pointer-events-none"
    >
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-start pointer-events-auto ml-auto pl-0 lg:pl-12">
        
        <h3 className="w-full text-center lg:text-left text-accent font-display text-sm sm:text-base lg:text-base tracking-[0.3em] uppercase mb-6 sm:mb-8">
          Know About US:
        </h3>
        
        <p className="w-full text-center lg:text-left text-gray-400 font-gothamT text-sm sm:text-xl lg:text-xl leading-relaxed mb-5 sm:mb-6">
          The Aerospace Society of BIT Mesra is a student-driven technical society dedicated to nurturing curiosity and innovation in the fields of aeronautics, astronautics, and space technology.
        </p>
        
        <p className="w-full text-center lg:text-left text-gray-400 font-gothamT text-lg sm:text-xl lg:text-xl leading-relaxed">
          Founded with the vision of inspiring the next generation of aerospace engineers and thinkers, the society acts as a launchpad for students passionate about the skies and beyond.   
        </p>
        
      </div>
    </section>
  );
};

export default AboutUs;