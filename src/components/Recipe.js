// Recipe.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Recipe = ({ title, calories, image, ingredients, protein, fat, carb }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  const [showGraph, setShowGraph] = useState(false);

  const toggleGraph = () => {
    setShowGraph(!showGraph);
  };

  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const carbsCalories = carb * 4;

  const chartData = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Calories from Each Macro',
        data: [proteinCalories, fatCalories, carbsCalories],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + ' kcal';
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y.toFixed(2) + ' kcal';
          },
        },
      },
    },
  };

  return (
    <div className="recipe">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{Math.round(calories)} kcal / serving</p>

      <button onClick={toggleGraph}>Macros</button>
      {showGraph && (
        <div style={{ paddingTop: '3%' }}>
          <Line data={chartData} options={chartOptions} />
        </div>      
      )}

      <div style={{ marginBottom: '5%' }}></div>

      <button onClick={toggleIngredients}>Ingredients</button>
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
