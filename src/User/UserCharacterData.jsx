import React from 'react'
// TODO: Replace this with the back-end data
import assets from '../assets/producer.p.json'

const UserCharacterData = ({selectedUser}) => {
    // TODO: Back-end data
    // const [assets, setAssets] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/api/users/${user.id}`)
    //       .then(response => setAssets(response.data))
    //       .catch(error => console.log(error));
    //   }, []);
    //   console.log(assets);
  return (
    <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
    {assets.map((char) => (
        // This consists of a character frame
        <div class="grid-member card" style="width: 18rem;">
            <img src={char.characterImg} class="card-img-top" alt={char.characterName}></img>
            <div class="card-body">
                <h5 class="card-title">{char.characterName}</h5>
                <p class="card-text">{char.characterStory}</p>
                {/* Need to have this button open a modal */}
                <a href="#" class="btn btn-primary"><i class="bi bi-house"></i>{char.characterWorld}</a>
                <a href="#" class="btn btn-primary">More...</a>
            </div>
        </div>
    ))}
    </div>
  )
}

export default UserCharacterData