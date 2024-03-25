import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SoundProvider } from './components/SoundContext';
import { DurationProvider } from './components/DurationContext';


const router = createBrowserRouter(routes)


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <DurationProvider>
        <SoundProvider>
            <RouterProvider router={router}/>
        </SoundProvider>
    </DurationProvider>
);


