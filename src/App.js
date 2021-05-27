import React from "react";
import Contact from "./Contact";
import ContactContextProvider from "./ContactContext";

function App() {
  return (
    <div className="App">
      <ContactContextProvider>
        <Contact />
      </ContactContextProvider>
    </div>
  );
}

export default App;
