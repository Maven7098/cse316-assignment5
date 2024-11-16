import React from 'react'

const BulletinEditWorld = ({myCharacters}) => {
    const [characterName, characterStory] = React.useState("");

    const onChangeForm = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        // Set the values in [Key,Value] pairs
        setForm(values => ({...values, [name]: value}))
      }

    const characterList = {
        return (
        <option selected>Choose your character:</option>
        myCharacters.map((character)=>{
        <option value={character}>character</option>
    }))
    }
  return (
    // Modal to add new article
    // List of news
    <div>
        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{marginTop:"76px"}}>
        Add news
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Write a message</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit="#">
                    <div className="modal-body">
                        <label htmlFor="characterName" className="col-sm-2 col-form-label">Title</label><br />
                        <input type="text" value={characterName} id="characterName" className="form-control" onChange={onChangeForm} /><br />
                        <label htmlFor="characterName" className="col-sm-2 col-form-label">Send as:</label><br />
                        <select className="form-select" aria-label="Default select example">
                            
                        </select>
                        <label htmlFor="characterStory">Message: </label>
                        {/* Beyond CSE316 - Import a WYSIWYG editor, and export this into a markdown or XHTML file */}
                        {/* This (along with the rest of the text stuff) needs to be an tracked */}
                        {/* Radio button and anything fancy is beyond the scope here */}
                        <textarea value={characterStory} id='characterStory' name='characterStory' onChange={onChangeForm} className="form-control"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <input type="submit" value="Finish" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default BulletinEdit