import React from 'react'

const CharacterData = () => {
    // I'm desperate. I built this as a result
  return (
    // Return a field first
    <div>
        <a href='character.html' className='btn btn-primary' style={{marginTop:"76px"}}>Edit Character</a>
        <table>
            {/* Need to render key as table heading */}
            {/* And their values as table row */}
            <tr>
                <img src="src/assets/1544251087604-1024x1024.png" style={{width:"256px"}}></img>
            </tr>
            <tr>
            <th>Name:</th>
            <td>랑이</td>
            </tr>
        </table>
    {/* // Then return image gallery */}
        <div>
            <h1>Story</h1>
            <p>랑이. Original character design copyrighted by Seed Novel. Image designed by Producer.P @ The Pseudoartist Clan.</p>
            <hr></hr>
            <h1>Gallery</h1>
            <hr></hr>
            <p>Image here</p>
        </div>
    </div>
  )
}

export default CharacterData