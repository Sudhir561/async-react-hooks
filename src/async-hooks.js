import React from 'react'
import { useState,useEffect } from 'react'



  function useGiphy(query){
    const[results,setResults]=useState([])
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
        async function fetchData()
        {
        try{
            setLoading(true)
         const response= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=UlnOELCbD8TX95ajcZSK5pleOPlH6Zmo&q=${query}&limit=12&offset=0&rating=g&lang=en`)
         const json= await response.json();
         console.log({json})
         setResults(json.data.map(items=>{
             return items.images.preview.mp4;
         }))
        }
        finally{
            setLoading(false)
        }
 
 
        }
       if(query!==""){
           fetchData();
       }
        
     },[query])

     return [results,loading];
 }




export const AsyncHooks = () => {
    const[search,setSearch]=useState("");
    const[query,setQuery]=useState("");
const [results,loading] =useGiphy(query);


  

    return (
        <div>
            <h2>HI!!! I am Sudhir </h2>
            <h1>Async React Hooks using Giphy Api</h1>
          <form onSubmit={(e)=>{
            e.preventDefault();
            setQuery(search);
            
          }}>
              <input type="text" placeholder=" Search here  GIPHY" value={search} onChange={e=>setSearch(e.target.value)}/>
              <button type="submit">Submit</button>
          </form>
          <br/>
          {
              loading?<h2>" Loading GIF..."</h2>:
                results.map(item=>{
                    return <video autoPlay loop key={item} src={item}/>
                })
            
          }
          
        </div>
    )
}
