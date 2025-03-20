import { useState } from 'react'
import './App.css'
import { Provider } from "react-redux";
import store from "./store/store";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";


function App() {
 
  const [selectedPuppyId, setSelectedPuppyId] = useState();

  return (
    <Provider store={store}>
      <h1>Puppy Bowl</h1>
      
      <NewPlayerForm />
      <main>
        <AllPlayers setSelectedPuppyId={setSelectedPuppyId} />
        <SinglePlayer
          selectedPuppyId={selectedPuppyId}
          setSelectedPuppyId={setSelectedPuppyId}
        />
      </main>
    </Provider>
  );
}

export default App
