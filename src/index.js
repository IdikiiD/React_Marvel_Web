import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./server/Server";
import "./style/style.scss";

const marvelService = new MarvelService();

marvelService.getCharacter('1010338').then(char => console.log(char.name))

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
