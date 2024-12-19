import React from 'react';

export default function ChallengeHeader() {
  return (
    <div className="text-center space-y-6 mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-tertiary-500">
        Challenge Interne Club
      </h2>
      <div className="flex justify-center">
        <img 
          src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
          alt="Tennis Club de Sillery"
          className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
        />
      </div>
    </div>
  );
}