import React from 'react'
import './App.css'
import { CategoryButtons } from './CategoryButtons'
import { Item } from './Item'
import { ItemList } from './ItemList'
import { Skeleton } from './Skeleton'



const url = 'https://api.rawg.io/api/games'
const apiKey = import.meta.env.VITE_RAWG_API_KEY

function App() {
  const [pageSize, setPageSize] = React.useState(10)
  const [data, setData] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [showSkeleton, setShowSkeleton] = React.useState(true)
  const [filterGenre, setFilterGenre] = React.useState(false)
  const [filterName, setFilterName] = React.useState(false)

  const [apiURI, setApiURI] = React.useState(`${url}?page_size=${pageSize}&key=${apiKey}`)

  React.useEffect(()=>{
    fetch(apiURI)
      .then(response=>response.json())
      .then(responseJSON=>setData(responseJSON))
      .catch(error=>setError(error))
      .finally(()=>setLoading(false))    
  },[apiURI])
  
  const changeUrl = (url) => {
    setApiURI(url)
  }

  const changePageSize = (size) => {
    setPageSize(size)
    setApiURI(apiURI.replace(`page_size=${pageSize}`, `page_size=${size}`))
  }

  return (
    <>
      <main>
        <header className="HeaderBox">
          <h1 className="HeaderTitle" >GamesList</h1>
        </header>

        <div className="optionsContainer">
          <div className="searchBox">
            <input className="searchInput" type="text" placeholder="Search on this page" onChange={e=>setFilterName(e.target.value)}/>
          </div>
          
          <CategoryButtons
            genres={["Action", "Adventure", "Shooter", "RPG"]}
            toggleFilterGenre={(genre)=>(filterGenre===genre) ? setFilterGenre(false) : setFilterGenre(genre)}
            styleFn={(genre)=>filterGenre===genre ? {backgroundColor: "rgba(255, 255, 255, 0.87)", color: 'black', borderBottom: "3px solid grey", borderRight: "3px solid grey"} : {}}
          />
        
          <div className="buttonsContainer">
            <div className="pageButtons">
              {loading && <p style={{fontSize: '1.3rem', fontWeight: 600}}>Loading...</p>}
              {(!loading && !error) &&  data.previous && <button onClick={()=>changeUrl(data.previous)} className="pageButtons-button">Previous Page</button>}
              {(!loading && !error) &&  !data.previous && <button disabled className="pageButtons-button disabledButton">Previous Page</button>}

              {(!loading && !error) &&  data.next && <button onClick={()=>changeUrl(data.next)} className="pageButtons-button">Next Page</button>}
              {(!loading && !error) &&  !data.next && <button disabled className="pageButtons-button disabledButton">Next Page</button>}
            </div>
          
            <div className="itemsPerPage">
              <label className="itemsPerPage-label" htmlFor="itemsPerPage">Results per page</label>
              <select disabled={filterGenre!==false} defaultValue="10" className="itemsPerPage-select" onChange={(e)=>changePageSize(e.target.value)} name="" id="itemsPerPage">
                <option 
                  className="itemsPerPage-option" 
                  value="5">
                    5
                </option>
                <option
                  className="itemsPerPage-option--selected" 
                  value="10">
                    10
                </option>
                <option 
                  className="itemsPerPage-option" 
                  value="20">
                    20
                </option>
              </select>
            </div>

          </div>

        </div>
        <ItemList
          loading={loading}
          data={data}
          error={error}
          filterGenre={filterGenre}
          filterName={filterName}
          onLoading={()=><Skeleton/>}
          // onError={}
          // onLoading={}
          render={element => (
              <Item
                key={element.id}
                name={element.name}
                image={element.background_image}
                rating={element.rating}
                released={element.released}
                genres={element.genres}
              />
              )}
        />


        
      </main>
    </>
  )
}

export default App
