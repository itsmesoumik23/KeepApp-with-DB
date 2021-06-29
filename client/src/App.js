import React, {useState, useEffect} from "react"
import Navbar from "./navbar"
import axios from "axios"
import './styles.css'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import Footer from "./Footer";


function App() {
  const [item, setItem] = useState({
    title: "", description: ""
  })

  const [items, setItems] = useState([{
    title: "", description: "", _id: ""
  }
  ])


  const [isPut, setIsPut] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({
    title: "", description: "", id: ""
  })

  const [isExpanded, setExpanded] = useState(false)



  useEffect(() => {
    fetch("/items").then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(jsonRes => setItems(jsonRes))
    .catch(err => console.log(err))
  }, [items])

  function handleChange(event){
    const {name, value} = event.target
    setItem((prev) => {
      return {...prev, [name]:value}
    })
  }

  function addItem(event){
    event.preventDefault()
    const newItem = {
      title : item.title, description : item.description
    }
    axios.post("/newItem", newItem)
    // alert("Item added")
    console.log(newItem);
    setItem({title: "", description: ""})
  }

  function deleteItem(id) {
    axios.delete("/delete/" + id)
    // alert("Item deleted")
  }

  function openUpdate(id){
    setIsPut(true)
    setUpdatedItem(prev => {
      return ({
        ...prev, id: id
      })
    })
  }
  function updateItem(id){
    axios.put("/put/" + id, updatedItem)
  }

  function handleUpdate(event){
    const {name, value} = event.target
    setUpdatedItem(prev => {
      return ({
        ...prev, [name] : value
      })
    })
  }

  

  function expand(){
    setExpanded(!isExpanded)
  }

  return (
    <div>
      <Navbar />
      {!isPut ? (
        <div className="create-note">
        {isExpanded && <input onChange={handleChange} name="title" value={item.title} placeholder="Title..."></input>}
        <textarea onClick={expand} onChange={handleChange} name="description" value={item.description} placeholder="Take a note..." rows={isExpanded ? 3 : 1}></textarea>
        <button onClick={addItem}><AddIcon /></button>
      </div>
      ) : (
        <div className="create-note">
        <input onChange={handleUpdate} name="title" value={updatedItem.title} placeholder="Title..."></input>
        <textarea onChange={handleUpdate} name="description" value={updatedItem.description} placeholder="Take a note..."></textarea>
        <button onClick={() => updateItem(updatedItem.id)}><UpdateIcon /></button>
      </div>
      )}
      
      <div className="App">
        
        {items.map((item) => {
          return (
            <div key={item._id} className="note">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button onClick={() => deleteItem(item._id)}><DeleteIcon /></button>
              <button onClick={() => openUpdate(item._id)}><UpdateIcon /></button>
            </div>
          )
        })}
        <Footer />
      </div>
      
    </div>
  )
}

export default App;
