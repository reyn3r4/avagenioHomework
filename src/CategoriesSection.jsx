import React from 'react';

function CategoriesSection() {
    const categories=[
        {id:1, tilte:"Action Games"},
        {id:2, tilte:"Sports Games"},
        {id:3, tilte:"Adventure Games"},
        {id:4, tilte:"Arcade Games"},
        {id:5, tilte:"Fantasy Games"},
        {id:6, tilte:"Strategy Games"},
        {id:7, tilte:"Shooter Games"},
        {id:8, tilte:"All Categories"}
    ]
  return (
    <section className='section-categories'>
      {/* Contenedor para las categorías de juegos */}
      <h2>Trending Categories</h2>
      {/* Aquí puedes mostrar las diferentes categorías de juegos */}
      <div className='category-cards'>
          {categories.map((category)=>(<div className='card' key={category.id}>
              <h4>/ {category.id}</h4>
              <h3>{category.tilte}</h3>
              <div className='flecha'> <img src={'flecha.png'} alt="flecha" style={{width:"20px"}}/></div>

          </div>))}
      </div>
    </section>
  );
}

export default CategoriesSection;