# react-complex-state

[![version](https://img.shields.io/npm/v/react-complex-state?style=flat-square)](https://www.npmjs.com/package/react-complex-state) [![downloads](https://img.shields.io/npm/dm/react-complex-state?style=flat-square)]() [![license](https://img.shields.io/npm/l/react-complex-state?style=flat-square)](http://opensource.org/licenses/MIT)

A custom hook that makes it easy when working with complex state in react.

## When to use it?

Consider using it when you have a **complex state**, such as an _array of strings_ or _array of objects_. Essentially, the state must contain an **array** of _any_ data type.

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
import { useComplexState } from "react-complex-state";

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

## Returns

If you see `Partial<T>` or just `T`, think of it as the **type of state** you passed to `useComplexState` hook.

| return            | type     | description                                                                                                                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value             | array    | The data of your state.                                                                                                                                                                              |
| setValue          | function | The usual `setState` function. Use it if you want control over your state.                                                                                                                           |
| count             | function | `(filter?: Partial<T>                                                                                                                                                                                | undefined) => number` <br /> Counts number of data that match filter in your state.                                       |
| find              | function | `(filter?: Partial<T>                                                                                                                                                                                | undefined) => T[]                                                                                                         | []`<br /> Finds all the data that match filter in your state. If your don't pass any filter and use it like `complexState.find()`, it'll be equivalent to `complexState.value`. |
| findOne           | function | `(filter: Partial<T>) => T                                                                                                                                                                           | null` <br /> Finds one data that match filter in your state. If multiple data are found, it'll only return the first one. |
| insert            | function | `(data: T, index?: number) => void` <br /> Add data to your state at an index. By default it will add the data at the end.                                                                           |
| insertMany        | function | `(data: T[], index?: number) => void` <br /> Add array of data to your state at an index. Defaults are similar to `insert` function.                                                                 |
| update            | function | `(data: T, index: number) => void` <br /> Update your state data at an index.                                                                                                                        |
| partialUpdate     | function | `(data: Partial<T>, index: number) => void` <br /> Update only the data that you passed at an index. Other remaining data will be unchanged. (Only usable when your state contains array of objects) |
| partialUpdateMany | function | `(data: Partial<T>, indexes: number[]) => void` <br /> Similar to `partialUpdate` function but update multiple data at once.                                                                         |
| remove            | function | `(index: number) => void` <br /> Delete your state data at an index.                                                                                                                                 |
| removeMany        | function | `(indexes: number[]) => void` <br /> Delete multiple data of your state at provided indexes.                                                                                                         |

## License

[MIT](http://opensource.org/licenses/MIT)
