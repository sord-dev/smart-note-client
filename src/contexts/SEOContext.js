import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SEOContext = createContext();

export const SEOProvider = ({ children }) => {
    const [SEOConfig, setSEOConfig] = useState({ title: 'SmartNote' });

    const configureSEO = (config) => {
        setSEOConfig(config)
    };

    useEffect(() => {
        console.log('SEO state updated: ', SEOConfig)
    }, [SEOConfig])

    return (
        <SEOContext.Provider value={{ SEOConfig, configureSEO }}>
            {children}
        </SEOContext.Provider>
    );
};

export const useSEOConfig = () => useContext(SEOContext)