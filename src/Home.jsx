import HomeWorld from "./HomeWorld.jsx"
import HomeChar from "./HomeChar.jsx"

const Home = () => {
    return(
        <>
            <div>
                <div>
                    <h1>List of Worlds</h1>
                </div>
                <div>
                    {/*<HomeWorld />*/}
                </div>
            </div>
            <div>
                <div>
                    <h1>List of Characters</h1>
                </div>
                <div>
                    <HomeChar />
                </div>
            </div>
        </>
    )
}

export default Home;