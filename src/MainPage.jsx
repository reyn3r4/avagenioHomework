import React, {useState} from 'react';
import Navbar from './NavBar';
import MainBoard from './MainBoard';
import CategoriesSection from './CategoriesSection';

function MainPage() {
  return (
    
    <div>
    
      <header>
        {/* Encabezado con el nombre del sitio y la navegación */}
        <Navbar ></Navbar>
      </header>
      <br></br>
      <section>
        {/* Sección principal con juegos destacados */}
        <MainBoard />
        {/* Aquí puedes mostrar los juegos destacados */}
      </section>
      <section>
        {/* Sección de categorías */}
        <CategoriesSection />
        {/* Aquí puedes mostrar las diferentes categorías de juegos */}
      </section>
    </div>
    
  );
}

export default MainPage;