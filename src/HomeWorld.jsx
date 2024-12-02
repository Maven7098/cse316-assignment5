import { react, useState, useEffect } from 'react'

const HomeWorld = () => {
    const [worldList, setWorldList] = useState([]);

    useEffect(() => {
        fetch("https://localhost:3000/worlds")
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const formatData = data.map(item => ({
                    worldId: item.worldId,
                    worldName: item.worldName,
                    worldIcon: item.worldIcon,
                    worldStory: item.worldStory,
                    worldCreator: item.worldCreator
                }
                ));
                setWorldList(formatData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if(!worldList){
        return(
            <p>Loading worlds...</p>
        )
    }


    return(
        <>
            {/* Modal for existing worlds */}
            {worldList.map((world) => (
                // This consists of a world frame
                <div className="grid-member card" style={{width: "18rem"}}>
                  <Link to={`/worlds/${world.worldId}`}>
                    {/* Insert character icon... Or throw placeholder if there is none */}
                    {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                    <img src={`/${world.worldIcon}`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/src/server/placeholder/world.png";
                        }} className="card-img-top" alt={world.worldName}></img>
                  </Link>
                    <div className="card-body">
                        <h5 className="card-title">{world.worldName}</h5>
                        <p className="card-text">{world.worldStory}</p>
                      {/* Upon clicking this button, the user will be sent to the creator of this world */}
                      {/* TODO: How to pass children if we were to travel through links? */}
                      {/* Also, world.worldCreator - 1 since SQL is 1-indexed but JS is 0-indexed - preventing off-by-one errors- */}
                      <Link className="btn btn-primary" to={`/users/${world.worldCreator}`}><i className="bi bi-people"></i>{users.find((user)=> user.userId == world.worldCreator)?.userName}</Link>
                    </div>
                  </div>
            ))}
        </>
    )
}

export default HomeWorld;