import React,{ useState } from 'react'
import axios from 'axios'

const initialFormData = {
  title: '',
  director: '',
  metascore: '',
  star: '',
  stars: [],
}

const AddMovie = ({ setMovieList, nextId }) => {
  const [ formData, setFormData ] = useState(initialFormData)

  const addStar = e => {
    e.preventDefault()
    if (!formData.star) return
    setFormData({...formData, star: '', stars: [...formData.stars, formData.star]})
  }

  const sumbitForm = e => {
    e.preventDefault()
    const formDataCopy = {...formData, stars: [...formData.stars], id: nextId}
    if (formData.star){
      formDataCopy.stars.push(formData.star)
    }
    setFormData(initialFormData)
    axios.post('http://localhost:5000/api/movies/', formDataCopy)
      .then(res => {
        setMovieList(res.data)
      })
  }

  let key = 0
  return(
    <div className='addMovie'>
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
        <input
          name='star'
          type='text'
          placeholder='add star'
          value={formData.star}
          onChange={e => setFormData({...formData, star: e.target.value})}
        />
        {formData.star && <button onClick={e => addStar(e)}>Add Star</button>}
        {formData.stars.map(v => (<div className='star' key={key++}>{v}</div>))}
        <button onClick={e => sumbitForm(e)}>Add Movie</button>
      </form>
    </div>
  )
}

export default AddMovie