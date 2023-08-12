import Background from "../components/sections/background"
import Footer from "../components/sections/footer"
import Navbar from "../components/sections/navbar"
import MainScreen from "./mainscreen"

const Home = () =>{
  return (
    <main className="relative w-full h-full pb-[15rem]">
      <Background/>
      <Navbar/>
      <MainScreen/>
      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Home
