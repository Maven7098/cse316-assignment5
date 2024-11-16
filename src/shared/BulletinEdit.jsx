import React from 'react'

const BulletinEdit = () => {
    const [characterName, characterStory] = React.useState("");

    const onChangeForm = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        // Set the values in [Key,Value] pairs
        setForm(values => ({...values, [name]: value}))
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
        {/* Existing news */}
        <h1>Producer.P's Bulletins</h1>
        {/* This will be rendered in bulk in the final version */}
        <hr></hr>
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    </div>
  )
}

export default BulletinEdit