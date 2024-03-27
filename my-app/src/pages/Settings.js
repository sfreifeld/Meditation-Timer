import homeBackgroundVideo from '../assets/home-background.mp4'
import '../index.css'
import SettingsChoice from '../components/SettingsChoice';
import NavBar from '../components/NavBar';
import SettingsTime from '../components/SettingsTime'

function Settings() {

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
          <div className="z-10 glass-container flex flex-col">
            <div className="settings-container p-10">
              <h2 className='text-4xl mb-10'>Settings</h2>
              <div className="my-6">
                <SettingsTime />
                <br></br><br></br>
                <SettingsChoice />
              </div>
            </div>
            


          </div>
        </div>
        </>
      );
    
}
  
  export default Settings;