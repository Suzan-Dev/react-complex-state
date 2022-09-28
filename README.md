# react-complex-state

[![version](https://img.shields.io/npm/v/react-complex-state?style=flat-square)](https://www.npmjs.com/package/react-complex-state) [![downloads](https://img.shields.io/npm/dm/react-complex-state?style=flat-square)]() [![license](https://img.shields.io/npm/l/react-complex-state?style=flat-square)](http://opensource.org/licenses/MIT)

A custom hook that makes it easy when working with complex state in react.

## When to use it?

You can consider using it when you have a **complex state** like _array of strings_ or _array of objects_ etc. Basically the state must have an **array** of _any_ data types.

## Installation

Npm :

```
$ npm install react-complex-state
```

Yarn :

```
$ yarn add react-complex-state
```

Pnpm :

```
$ pnpm add react-complex-state
```

## Usage

Pass the state you want to use in `useComplexState` hook like you do in `useState`.

```jsx
import useComplexState from "react-complex-state";

function App() {
  const complexState = useComplexState(["John", "William"]);

  return (
    <>
      <div>
        {complexState.value.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <button onClick={() => complexState.insert("Noah")}>Add</button>
    </>
  );
}

export default App;
```

### Returns

| return        | type     | description                                                                                                                                                                                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value         | array    | The data of your state.                                                                                                                                                                              |
| setValue      | function | The usual setState function. Use it if you want control over your state.                                                                                                                             |
| insert        | function | `(data: T, index?: number) => void` <br /> Add data to your state at an index. By default it will add the data at the end.                                                                           |
| update        | function | `(data: T, index: number) => void` <br /> Update your state data at an index.                                                                                                                        |
| partialUpdate | function | `(data: Partial<T>, index: number) => void` <br /> Update only the data that you passed at an index. Other remaining data will be unchanged. (Only usable when your state contains array of objects) |
| remove        | function | `(index: number) => void` <br /> Delete your state data at an index.                                                                                                                                 |

## License

[MIT](http://opensource.org/licenses/MIT)
