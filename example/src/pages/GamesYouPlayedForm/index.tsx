import { useComplexState } from "react-complex-state";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { InputContainerStyle, TitleStyle } from "./styles";

// const generateFakeData = () => ({
//   fullName: faker.name.fullName(),
//   song: faker.music.songName(),
// });

interface PlayedVideoGames {
  title: string;
  playedDate: string;
  rating: string;
}

const initialState = {
  title: "",
  playedDate: "",
  rating: "",
};

const GamesYouPlayedForm = () => {
  const playedVideoGames = useComplexState<PlayedVideoGames>([]);

  return (
    <>
      <TitleStyle>
        <h1>Video Games you played</h1>
        <Button
          onClick={() => {
            if (playedVideoGames.value.length < 5) {
              playedVideoGames.insert(initialState);
            }
          }}
        >
          Add
        </Button>
      </TitleStyle>
      {playedVideoGames.value.length ? (
        playedVideoGames.value.map((videoGame, index) => (
          <InputContainerStyle key={index}>
            <Input
              placeholder="Title"
              value={videoGame.title}
              onChange={(e) =>
                playedVideoGames.partialUpdate({ title: e.target.value }, index)
              }
            />
            <Input
              placeholder="Played Date"
              type="number"
              value={videoGame.playedDate}
              onChange={(e) =>
                playedVideoGames.partialUpdate(
                  { playedDate: e.target.value },
                  index
                )
              }
            />
            <Input
              placeholder="Your rating out of 10"
              type="number"
              value={videoGame.rating}
              onChange={(e) =>
                playedVideoGames.partialUpdate(
                  { rating: e.target.value },
                  index
                )
              }
            />
            <Button
              onClick={() => playedVideoGames.remove(index)}
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

      {playedVideoGames.value.length === 5 && <p>You cannot add any more</p>}
    </>
  );
};

export default GamesYouPlayedForm;
