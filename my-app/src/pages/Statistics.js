import NavBar from '../components/NavBar';
import MyCharts from '../components/Charts/MyCharts'
import backgroundImage from '../assets/white-background.jpg'


function Statistics() {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="bg-cover bg-center min-h-screen">
            <header className='z-80'>
                <NavBar/>
            </header>
            <MyCharts />
        </div>
    )
}


export default Statistics