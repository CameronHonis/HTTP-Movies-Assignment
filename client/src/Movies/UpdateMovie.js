import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateMovie = ({ movieList, setMovieList }) => {
  const params = useParams()
  const history = useHistory()
  
  const [formData, setFormData ] = useState({})

  useEffect(() => {
    console.log('finding original movie...')
    for (let i in movieList){
      if (movieList[i].id === Number(params.id)){
        console.log('found original movie')
        setFormData(movieList[i])
        break
      }
    }
  },[movieList])

  // const submitForm = e => {
  //   e.preventDefault()
  //   axios.put(`http://localhost:5000/api/movies/${params.id}`, formData)
  //     .then(res => {
  //       setMovieList(res.data)
  //       history.push('/')
  //     })
  // }

  return(
    <div className='addMovie'>
      <h2>Edit movie</h2>
      <form>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <input
          name='director'
          type='text'
          placeholder='director'
          value={formData.director}
          onChange={e => setFormData({...formData, director: e.target.value})}
        />
        <input
          name='metascore'
          type='text'
          placeholder='metascore'
          value={formData.metascore}
          onChange={e => setFormData({...formData, metascore: e.target.value})}
        />
        {/* <button onClick={e => submitForm(e)}>Edit Movie</button> */}
        <button onClick={e => {
          //e.preventDefault()
          axios.put(`http://localhost:5000/api/movies/${params.id}`, formData)
          .then(res => {
            setMovieList(res.data)
            history.push('/')
          })
        }}>Edit Movie</button>
      </form>
    </div>
  )
}
export default UpdateMovie