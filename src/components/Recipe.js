// Recipe.js
import React, { useState } from 'react';

const Recipe = ({ title, calories, image, ingredients }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="recipe">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Calories: {Math.round(calories)}</p>

      {/* Button to toggle ingredients visibility */}
      <button onClick={toggleIngredients}>Show Ingredients</button>

      {/* Display ingredients if showIngredients is true */}
      {showIngredients && (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipe;
