import React from "react";


export const GlobalLayout = ({ children }) => {
    return (
        <div className="gradient-background">
            {children}
        </div>
    );
};