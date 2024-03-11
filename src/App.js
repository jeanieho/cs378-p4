// App.js
import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe';
import Logo from './components/Logo';
import './App.css';

const App = () => {
  const APP_ID = '0bb7ade2';
  const APP_KEY = '2a8dd65936be4ffa48efb26f55bc77b9';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('easy');
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`
      );
      const data = await response.json();

      if (data.hits.length === 0) {
        setError(`Recipes for "${query}" not found!`);
        setRecipes([]);
      } else {
        setError('');
        const formattedRecipes = data.hits.map((recipe) => {
          return {
            title: recipe.recipe.label,
            calories: Math.round(recipe.recipe.calories),
            image: recipe.recipe.image,
            ingredients: recipe.recipe.ingredients,
            protein: recipe.recipe.totalNutrients.PROCNT.quantity,
            fat: recipe.recipe.totalNutrients.FAT.quantity,
            carb: recipe.recipe.totalNutrients.CHOCDF.quantity,
          };
        });
        setRecipes(formattedRecipes);
      }
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
      console.error('Error fetching recipes:', error);
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const handleCuisineClick = (cuisine) => {
    setQuery(cuisine);
  };

  return (
    <div className="App">
      <div className="header-container">
        <div className="logo-container">
          <Logo />
        </div>
        <form onSubmit={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
            placeholder="Search recipes"
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="cuisine-buttons">
        <button onClick={() => handleCuisineClick('chinese')}>Chinese</button>
        <button onClick={() => handleCuisineClick('japanese')}>Japanese</button>
        <button onClick={() => handleCuisineClick('korean')}>Korean</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.title}
            title={recipe.title}
            calories={recipe.calories}
            image={recipe.image}
            ingredients={recipe.ingredients}
            protein={recipe.protein}
            fat={recipe.fat}
            carb={recipe.carb}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
