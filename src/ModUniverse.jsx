import React from 'react'

// Inside World page, the following is available:
// IF founder, then you can add character or delete world.
// You cannot add a character already enlisted in a world.
// IF user, then you can only add character.

const AddChar = (username) => {
  // As long as a character name and story are given, we're fine
  // One design problem
  const [characterID, characterName, characterStory, characterImg, worldCharacter] = React.useState("");

  // Export the form data
  // Right now, I will use the alert to test the waters.
  // In actuality, more than 1 characters can share the name
  const validate = () => {
    if(characterID == null || characterStory == null){
      alert("Your character must need at least a name or a story.");
    }
    // Now let's generate an ID
    characterID = Math.floor(Math.random() * (2^16 - 1 + 1)) + 1;
    while(username.getItem(characterID) != null){
      characterID = Math.floor(Math.random() * (2^16 - 1 + 1)) + 1;
    }
    console.log(JSON.stringify(formData));
  }

  const addFormData = (event) => {
    // APPEND
    // Name of field is custom
    // Value of that field is customValue
    event.preventDefault
    append(custom, customValue);
  }

  const addImageData = () => {
    // APPEND
    // Name of field is custom
    // Value of that field is customValue
    characterImg.append(characterImg);
  }

  const onChangeForm = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    // Set the values in [Key,Value] pairs
    setForm(values => ({...values, [name]: value}))
  }

  return (
    // Character form
    <form onSubmit={validate} style={{marginTop: "78px", display: "flex", flexDirection:"column", flex:"1 1 auto"}}>
      <h1>Add New World</h1>
      {/* World ID is generated and is not an input here. */}
      {/* Required items: World name */}
      {/* Beyond CSE316: Multilingual support may also be in the cards */}
      <label htmlFor="characterName" className="col-sm-2 col-form-label">World Name</label><br />
      <input type="text" value={characterName} id="characterName" className="form-control" onChange={onChangeForm} /><br />

      {/* List of Characters in a World is a list, not a singular value like Character would */}
      {/* For ease of access, one character is still associated with a single world, although you can make copies of your character if you want RPs from multiple worlds */}
      {/* But even then, it's better off creating new settings altogether */}
      <label htmlFor="worldCharacter" className="col-sm-2 col-form-label">Associated Characters (Optional): </label><br />
      <input type="text" value={worldCharacter} id="worldCharacter" className="form-control" onChange={onChangeForm} /><br />
      
      {/* Optional items: World Description */}
      {/* A text description will do for now */}
      <label htmlFor="characterStory">World Backstory (Optional): </label>
      {/* Beyond CSE316 - Import a WYSIWYG editor, and export this into a markdown or XHTML file */}
      {/* This (along with the rest of the text stuff) needs to be an tracked */}
      {/* Radio button and anything fancy is beyond the scope here */}
      <textarea value={characterStory} id='characterStory' name='characterStory' onChange={onChangeForm} className="form-control"></textarea>

      {/* Maybe images for even characters or worlds can be optional? */}
      {/* It is easy to add a placeholder value in React, though I'm pressed for time */}
      <label htmlFor="characterImg">Icon for World (Optional): </label><br />
      <input type="file" value={characterImg} id="characterImg" className="form-control"></input>
      
      <input type="submit" value="Submit" className="btn btn-primary"></input>
    </form>
  )
}

export default AddChar