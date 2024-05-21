import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import AppHeader from './components/AppHeader';
import AddMovieForm from './components/AddMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

const App = props => {
  const [displayFavorites, setDisplayFavorites] = useState(false);

  const favList = useSelector(store => store.favorites.favorites.Film);

  const checkIfFavIsEmpty = () => {
    if (favList.length >= 1) {
      setDisplayFavorites(true);
    } else {
      setDisplayFavorites(false);
    }
  };

  useEffect(() => {
    checkIfFavIsEmpty();
  }, [favList]);

  const toggleFavorites = () => {
    setDisplayFavorites(!displayFavorites);
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">Redux Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <AppHeader toggleFavorites={toggleFavorites} displayFavorites={displayFavorites} />
        <div className="flex flex-col sm:flex-row gap-4">
          {displayFavorites && <FavoriteMovieList displayFavorites={displayFavorites} />}

          <Switch>
            <Route exact path="/movies/add">
              <AddMovieForm />
            </Route>

            <Route path="/movies/:id">
              <Movie />
            </Route>

            <Route path="/movies">
              <MovieList />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
