import HomeWorld from "./HomeWorld.jsx"
import HomeChar from "./HomeChar.jsx"

const Home = () => {
    return(
        <>
            <div>
                <h1>List of Worlds</h1>
                <HomeWorld />
            </div>
            <div>
                <h1>List of Characters</h1>
                <HomeChar />
            </div>
        </>
    )
}

export default Home;