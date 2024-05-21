import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../actions/favoritesActions';

const FavoriteMovieList = ({ displayFavorites }) => {
  const favorites = useSelector(store => store.favorites.favorites.Film || []);
  const dispatcher = useDispatch();

  const removeFavMovieHandler = (e) => {
    const dataId = e.target.getAttribute('data-id');
    console.log("data-id : ", dataId);
    dispatcher(removeFavorite(dataId));
  };

  if (!displayFavorites) {
    return null; // Favoriler gizli ise bileşeni render etme
  }

  return (
    <div className="flex-1 sm:max-w-[250px] p-5 pr-5 bg-white shadow rounded-md">
      <h5 className='font-bold'>Favori Filmler</h5>
      <div className="pt-3 text-sm">
        {
          favorites.map(movie => (
            <div key={movie.id} className="py-1 flex gap-2 justify-between">
              <Link to='' className="flex-1">
                {movie.title}
              </Link>
              <span data-id={movie.id} className="material-icons hover:text-red-600 text-[18px]"
                onClick={removeFavMovieHandler}>
                remove_circle
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteMovieList;
