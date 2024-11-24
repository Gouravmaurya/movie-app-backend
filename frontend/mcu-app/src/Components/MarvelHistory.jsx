import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarvelHistory = () => {
    const sectionRef = useRef();
    const footerRef = useRef();

    useEffect(() => {
        gsap.fromTo(sectionRef.current, 
            { opacity: 0, y: 50 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Animation starts when the top of the section is 80% from the top of the viewport
                    toggleActions: "play none none reverse" // Play on enter, reverse on leave
                }
            }
        );

        gsap.fromTo(footerRef.current, 
            { opacity: 0, y: 50 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%", // Animation starts when the top of the footer is 90% from the top of the viewport
                    toggleActions: "play none none reverse" // Play on enter, reverse on leave
                }
            }
        );
    }, []);

    return (
        <>
         {/* Creator Section */}
      <section ref={sectionRef} className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">About the Creator</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-64 h-64 rounded-full overflow-hidden">
              <img 
                src="https://th.bing.com/th/id/OIP.MojyWSAyNhhfgIxo-ub-ywHaKX?w=208&h=291&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Creator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">Stan Lee</h3>
              <p className="text-gray-300 mb-6">
                A passionate Marvel enthusiast and web developer dedicated to creating immersive experiences 
                for fellow Marvel fans. With expertise in modern web technologies and a deep love for the 
                Marvel Universe, this platform aims to bring the best of both worlds together.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://github.com/yourusername" className="text-red-500 hover:text-red-400">GitHub</a>
                <a href="https://linkedin.com/in/yourusername" className="text-red-500 hover:text-red-400">LinkedIn</a>
                <a href="https://twitter.com/yourusername" className="text-red-500 hover:text-red-400">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className="py-10 bg-zinc-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Marvel Universe</h2>
          <p className="mb-2">Explore the vast world of Marvel Comics and Movies.</p>
          <p className="mb-2">Join us in celebrating the heroes and stories that inspire us all.</p>
          <p className="mb-2">© 2023 Marvel Universe. All rights reserved.</p>
        </div>
      </footer>
        </>
      );
}

export default MarvelHistory