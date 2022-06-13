import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { Rover } from "./Rover";

const Select = () => {
    const [rovers, setRovers] = useState([]); 
    const [roverName, setRoverName] = useState('')
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=DEMO_KEY';
  
  useEffect(() => {
    getAllRovers()
  }, [])
  useEffect(() => {
    //console.log(roverName)
  }, [roverName])
  const getAllRovers = () => {
    const check = localStorage.getItem('rovers')
    if(check) {
      setRovers(JSON.parse(check))
    } else {
      axios.get(`${url}`).then((response) => {
        localStorage.setItem('rovers', JSON.stringify(response.data.rovers))
        setRovers(response.data.rovers)
      })
    }
  }

  const roversValues = () => {
    return (
       <select value={roverName} name="rovers" id="rselect" onChange={(e) => {
          setRoverName(e.target.value)
       }}>
        <option value="">---</option>
        {rovers.map((rover) => {
        return (

        <option value={rover.name.toLowerCase()} key={rover.id}>{rover.name}</option>
        )
    })}
    </select>
    )
  }
  return (
    <div className="upper">
      <h1>Choose your rover</h1>
      {roversValues()}
      <hr />
      <Rover name={roverName}/>
    </div>
  );
}

export default Select