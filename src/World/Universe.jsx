import React from 'react'
import assets from "../assets/producer.p_world.json"
// List recent characters
// This should accept isOwner as prop
// isOwner is a boolean value, is true if this function is invoked within a webpage of an owner
// In all the other places
// (there are 3 places where you can see characters)
// The index page
// The user->character page
// The world->character page
// Character owner is shown in index and world, but not in user
const Index = (props) => {
  // Props cannot be used as 'switches' as they only accept K/V object pairs.
  console.log(props.Index);
  return (
    <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
    {assets.map((char) => (
        // This consists of a character frame
        <div className='grid-member' style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
            {/* Resize image to appropriate size */}
            <div>
            <img src={char.characterImg} style={{width: "500px"}} />
            </div>
            {/* Put character name behind it */}
            <div>
            <button className="btn btn-primary">{char.characterName}</button>
            {/* IF isOwner is false, show owner */}
            {/* {A ? B : C} - ternary, {A && B} - ternary, but no 'else if' */}
            </div>
        </div>
    ))}
    </div>
  )
}

export default Index