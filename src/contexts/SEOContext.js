import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultConfig = { title: 'SmartNote', description: "An AI assisted note taking application to help with content writing and functional story telling" }

const SEOContext = createContext();

export const SEOProvider = ({ children }) => {
    const [SEOConfig, setSEOConfig] = useState(defaultConfig);

    const configureSEO = (config) => {
        if (JSON.stringify(config) == JSON.stringify(SEOConfig)) return;
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