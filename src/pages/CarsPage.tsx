
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getFilteredCars } from '@/data/carService';
import { CarFilters } from '@/components/cars/CarFilters';
import { CarCategories } from '@/components/cars/CarCategories';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  // Get all cars and apply filters
  const allCars = getFilteredCars(search, minPrice, maxPrice, selectedBrand);
  
  const resetFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setPriceRange([0, 1000000]);
    setActiveTab('all');
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Explora nuestro catálogo</h1>

        {/* Filters */}
        <CarFilters 
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* Car Categories and Listing */}
        <CarCategories 
          allCars={allCars}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onResetFilters={resetFilters}
        />
      </div>
    </Layout>
  );
};

export default CarsPage;
