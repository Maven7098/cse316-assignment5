import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Search = () => {
    const [genericList, setGenericList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    const searchQuery = searchParams.get("searchQuery");
    console.log(searchQuery);
    
    // Does not refresh
    // Unlike the other opeartions where I send strings, I chose to leave this one alone
    // In all other tasks, I add "'" to prevent strings from detaching when SQL calls
    // but here, we need to reconstruct this into SQL so that I can add "%"
    // which cannot be called outside of SQL as this constitutes a routing error
    useEffect(() => {
    // I ultimately decided search as GET-type (not POST-type)
    // searchQuery is sent  
    axios.get(`http://localhost:3000/api/search?searchQuery=${searchQuery}`)
      // Grab only the titles; that's all what matters!
      .then((response) => setGenericList(response.data))
      .catch(error => console.log(error))
    }, [searchQuery]);
  
    console.log("List of matching stuff: ", genericList);

    if(!genericList){
      return(
          <p>Loading...</p>
      )
    }

    // Three switch values - if TRUE, show values, else do not show value
    // Do now show users?
    const [showUsers, setShowUsers] = useState(true);
    // Do now show worlds?
    const [showWorlds, setShowWorlds] = useState(true);
    // Do now show characters?
    const [showCharacters, setShowCharacters] = useState(true);

    // TODO - Implement pagination
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // 10 items per page. The world creation modal takes up 1 card, but is not part of the list.
    let itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    let currentItems = genericList.toReversed().slice(itemOffset, endOffset);
    let pageCount = Math.ceil(genericList.length / itemsPerPage);
    // Create a deep copy of the List
    // Deep copy is required in order to prevent mutation of genericList itself.
    let tempList = structuredClone(genericList);
    if(!showCharacters || showUsers || showWorlds){
        if(!showCharacters){
            tempList = tempList.filter((genericObject)=>genericObject.objectType != "char")
        }
        if(!showWorlds){
            tempList = tempList.filter((genericObject)=>genericObject.objectType != "world")
        }
        if(!showUsers){
            tempList = tempList.filter((genericObject)=>genericObject.objectType != "user")
        }
        currentItems = tempList.slice(itemOffset, endOffset);
        pageCount = Math.ceil(tempList.length / itemsPerPage);
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % genericList.length;
    console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    };

    return (
        <>
        {/* House the 3 switches - user, world, character */}
        <div>
            <div className="form-check form-switch" style={{marginLeft:"300px"}}>
                <input className="form-check-input" type="checkbox" role="switch" readOnly={true} checked={showUsers} onClick={() => setShowUsers(!showUsers)} id="flexSwitchCheckDefault" />
                {/* Find the current username, since I did not bring the user data here */}
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Users</label>
            </div>
            <div className="form-check form-switch" style={{marginLeft:"300px"}}>
                <input className="form-check-input" type="checkbox" role="switch" readOnly={true} checked={showWorlds} onClick={() => setShowWorlds(!showWorlds)} id="flexSwitchCheckDefault" />
                {/* Find the current username, since I did not bring the user data here */}
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Worlds</label>
            </div>
            <div className="form-check form-switch" style={{marginLeft:"300px"}}>
                <input className="form-check-input" type="checkbox" role="switch" readOnly={true} checked={showCharacters} onClick={() => setShowCharacters(!showCharacters)} id="flexSwitchCheckDefault" />
                {/* Find the current username, since I did not bring the user data here */}
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show Characters</label>
            </div>
        </div>

        {/* Pagination is always ON in search menu */}
        <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
        />

        {/* div to house the rest of the contents */}
        <div className="container-fluid">
            <div className="row flex-nowrap">
            <div className="grid-container" style={{display:"flex", flexWrap:"wrap", marginTop:"72px", flex:"1"}}>
                {/* Only render character frame if there is at least 1 character */}
                {currentItems.length > 0 && (
                currentItems.map((char) => (
                    // This consists of a character frame
                    <div className="grid-member card" style={{width: "18rem"}}>
                        {/* Insert character icon... Or throw placeholder if there is none */}
                        {/* Code taken from https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror */}
                        {/* Give a different placeholder image if this is a world */}
                        {(function() {
                            if (char.objectType == "world") {
                                return (
                                    <Link to={`/worlds/${char.objectId}`}>
                                        <img src={`/${char.objectIcon}`} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/src/server/placeholder/world.png";
                                        }} className="card-img-top" alt={char.objectName}></img>
                                    </Link>
                                );
                            } else if (char.objectType == "user") {
                                return (
                                    <Link to={`/users/${char.objectId}`}>
                                        <img src={`/${char.objectIcon}`} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/src/server/placeholder/user.png";
                                        }} className="card-img-top" alt={char.objectName}></img>
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link to={`/worlds/${char.objectId}`}>
                                        <img src={`/${char.objectIcon}`} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/src/server/placeholder/user.png";
                                        }} className="card-img-top" alt={char.objectName}></img>
                                    </Link>
                                )
                            }
                        })()}
                        
                        <div className="card-body">
                            <h5 className="card-title">{char.objectName}</h5>
                        </div>
                    </div>
                ))
                )}
            </div>
        </div>
        </div>
    </>
    )
}

export default Search;