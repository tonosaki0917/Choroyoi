import React, { createContext, useState, useContext } from 'react';

// Contextの作成
const DrinkContext = createContext();

// Context Providerの作成
export const DrinkProvider = ({ children }) => {
    const [extractedDrinks, setExtractedDrinks] = useState([]);

    return (
        <DrinkContext.Provider value={{ extractedDrinks, setExtractedDrinks }}>
            {children}
        </DrinkContext.Provider>
    );
};

// Contextを使うためのカスタムフック
export const useDrinkContext = () => useContext(DrinkContext);