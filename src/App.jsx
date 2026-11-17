import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WorkGallery from './components/WorkGallery.jsx';
import Capabilities from './components/Capabilities.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkGallery />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
      <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
    </>
  );
}
