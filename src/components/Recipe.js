// Recipe.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Recipe = ({ title, calories, image, ingredients, protein, fat, carb }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  // Calculate the percentage of calories contributed by each nutrient
  const proteinPercentage = (protein / calories) * 100;
  const fatPercentage = (fat / calories) * 100;
  const carbsPercentage = (carb / calories) * 100;

  // Define data for the line graph
  const chartData = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Caloric Breakdown',
        data: [proteinPercentage, fatPercentage, carbsPercentage],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="recipe">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Calories: {Math.round(calories)}</p>

      {/* Line graph for caloric breakdown */}
      <Line data={chartData} />

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
