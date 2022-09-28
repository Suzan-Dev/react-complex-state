import { faker } from "@faker-js/faker";
import { useComplexState } from "react-complex-state";
import reactLogo from "./assets/react.svg";
import "./App.css";

const generateFakeData = () => ({
  fullName: faker.name.fullName(),
  song: faker.music.songName(),
});

function App() {
  const complexState = useComplexState([
    generateFakeData(),
    generateFakeData(),
  ]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {complexState.value.map((item) => (
        <div className="card" key={item.fullName}>
          <h3>Name: {item.fullName}</h3>
          <p>Liked Song: {item.song}</p>
        </div>
      ))}

      <div>
        <button onClick={() => complexState.insert(generateFakeData(), 0)}>
          Add
        </button>
        <button onClick={() => complexState.update(generateFakeData(), 0)}>
          Update
        </button>
        <button
          onClick={() =>
            complexState.partialUpdate({ fullName: faker.name.fullName() }, 1)
          }
        >
          Partial Update
        </button>
        <button onClick={() => complexState.remove(0)}>Delete</button>
      </div>

      <div>
        <button
          onClick={() =>
            complexState.insertMany([generateFakeData(), generateFakeData()])
          }
        >
          Add Many
        </button>
      </div>
    </div>
  );
}

export default App;
