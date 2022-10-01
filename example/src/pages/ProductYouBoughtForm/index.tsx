import { faker } from "@faker-js/faker";
import { useComplexState } from "react-complex-state";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { InputContainerStyle, TitleStyle } from "../GamesYouPlayedForm/styles";

const generateFakeData = () => ({
  title: faker.commerce.productName(),
  boughtDate: faker.date.month(),
  rating: faker.random.numeric(),
});

interface BoughtProducts {
  title: string;
  boughtDate: string;
  rating: string;
}

const initialState = () => ({
  title: "",
  boughtDate: "",
  rating: "",
});

const FilledGamesYouPlayedForm = () => {
  const boughtProducts = useComplexState<BoughtProducts>([
    generateFakeData(),
    generateFakeData(),
  ]);

  return (
    <>
      <TitleStyle>
        <h1>Products you bought</h1>
        <Button
          onClick={() => {
            if (boughtProducts.value.length < 5) {
              boughtProducts.insert(initialState());
            }
          }}
        >
          Add
        </Button>
      </TitleStyle>
      {boughtProducts.value.length ? (
        boughtProducts.value.map((product, index) => (
          <InputContainerStyle key={index}>
            <Input
              placeholder="Title"
              value={product.title}
              onChange={(e) =>
                boughtProducts.partialUpdate({ title: e.target.value }, index)
              }
            />
            <Input
              placeholder="Played Date"
              value={product.boughtDate}
              onChange={(e) =>
                boughtProducts.partialUpdate(
                  { boughtDate: e.target.value },
                  index
                )
              }
            />
            <Input
              placeholder="Your rating out of 10"
              type="number"
              value={product.rating}
              onChange={(e) =>
                boughtProducts.partialUpdate({ rating: e.target.value }, index)
              }
            />
            <Button
              onClick={() => boughtProducts.remove(index)}
              css={{
                border: "2px solid #d90429",
                color: "#d90429",
                "&:after": {
                  background: "#d90429",
                },
              }}
            >
              Delete
            </Button>
          </InputContainerStyle>
        ))
      ) : (
        <p>Click on the Add button</p>
      )}

      {boughtProducts.value.length === 5 && <p>You cannot add any more</p>}
      <p>Total Bought Products: {boughtProducts.count()}</p>
      <p>
        Total Full Rating Products: {boughtProducts.count({ rating: "10" })}
      </p>
    </>
  );
};

export default FilledGamesYouPlayedForm;
