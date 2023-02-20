import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

import ButtonAppBar from "../components/ButtonAppBar"
import Card from "../components/Card"

function App() {

  const [users, setUsers] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [allHospital, setAllHospital] = useState([])
  const [isFirst,setIsFirst] = useState(true)
  const [actualHospital, setActualHospital] = useState()
  const [everyHospital,setEveryHospital] = useState()
  const [test,setTest]= useState(true)


  async function getAllUsers() {
    const allUsers = await axios.get("http://localhost:3000/users")
    setUsers(allUsers.data)
  }
  async function getEveryHospital() {
    const getEveryHospital = await axios.get("http://localhost:3000/partners") 
    setEveryHospital(getEveryHospital.data)
  }
  

  async function getHospital() {
    if(currentUser){
      setIsFirst(false)
        setAllHospital([])
        currentUser.access.map(async(id) =>{
          const response = await axios.get(`http://localhost:3000/partners/${id}`)
          const data = response.data[0]
          setAllHospital(oldArray => [...oldArray,data])
          if(allHospital.length !<1){
            setActualHospital(allHospital[0])
          }     
    })
  }
  }


  useEffect(() => {
    getAllUsers()
    getEveryHospital()
  }, [test])

  useEffect(() => {
    getHospital()
  }, [currentUser,test])

  return (
    <div className="App">
      <ButtonAppBar
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser} />
       <Card setTest={setTest} currentUser={currentUser}everyHospital={everyHospital} allHospital={allHospital} isFirst={isFirst} setCurrentUser={setCurrentUser} /> 
    </div>
  )
}

export default App
