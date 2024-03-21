import homeBackgroundVideo from '../assets/home-background.mp4'
import Timer from '../components/Timer'
import NavBar from '../components/NavBar';

function Home() {
    return (
      <>
      <header>
        <NavBar />
      </header>
      <div className="relative min-h-screen flex items-center justify-center">
        <video autoPlay loop muted className="absolute w-full h-full object-cover">
          <source src={homeBackgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Timer className="z-10" />
      </div>
      </>
    );
  }
  
  export default Home;