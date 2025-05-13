
import React from 'react';

interface CarFeaturesProps {
  features: string[];
}

export const CarFeatures = ({ features }: CarFeaturesProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Características</h2>
      <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center transition-transform duration-300 hover:translate-x-1">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
