import React, {useState, useEffect} from 'react'
import axios from 'axios';


export const Rover = ({name}) => {
    const [info, setInfo] = useState([]);
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=1000&page=1&api_key=DEMO_KEY`;

    useEffect(() => {
     getInfo()
     console.log(name)
    }, [name])
    const getInfo = () => {
        if(!name) {
          return
        } 
        axios.get(`${url}`).then((response) => {
              setInfo(response.data.photos)
              console.log(response)
            })
    }
    const roversPhotos = () => {
      return(
        <div className='cards'>
          {info.map((info) => {
            return (
              <div className='card' key={info.id}>
                <img src={info.img_src} alt={info.id}/>
                <h4>{info.camera.name}</h4>
                <h4>{info.earth_date}</h4>
              </div>
            )
          })}
        </div>
      )
    }
  return (
    <div>{roversPhotos()}</div>
  )
}
