import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from './Movies/AddMovie'
import UpdateMovie from './Movies/UpdateMovie'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [nextId, setNextId] = useState(0)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const removeMovieList = id => {
    // eslint-disable-next-line
    setMovieList(movieList.filter(v => v.id != id))
  }

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    let highestId = 0
    for (let i in movieList){
      if (movieList[i].id > highestId){
        highestId = movieList[i].id
      }
    }
    setNextId(++highestId)
  },[movieList])

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
        <Link to='/add-movie'>Add movie</Link>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeMovieList={removeMovieList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/add-movie'>
        <AddMovie setMovieList={setMovieList} nextId={nextId}/>
      </Route>
    </>
  );
};

export default App;
