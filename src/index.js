import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./server/Server";
import "./style/style.scss";

const marvelService = new MarvelService();

marvelService.getCharacter('1010338').then(res => res.data.results.forEach(item => console.log(item.name)))

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
