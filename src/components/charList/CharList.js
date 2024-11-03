import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from "react";
import MarvelService from "../../server/Server";

class CharList extends Component {
    state = {
        char: [],       // Массив для списка персонажей
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        this.setState({ loading: true, error: false });

        // Генерация массива из 9 случайных id персонажей
        const promises = Array.from({ length: 9 }, () => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            return this.marvelService.getCharacter(id);
        });

        // Выполнение всех запросов параллельно и обновление состояния
        Promise.all(promises)
            .then((newChars) => {
                this.setState(({ char }) => ({
                    char: [...char, ...newChars],
                    loading: false,
                    error: false
                }));
            })
            .catch(this.onError);
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    };

    render() {
        const { char, loading, error } = this.state;

        // Генерация списка персонажей
        const charItems = char.map((character, index) => (
            <li key={index} className="char__item">
                <img src={character.thumbnail || abyss} alt={character.name || 'character'} />
                <div className="char__name">{character.name || 'Unknown'}</div>
            </li>
        ));

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charItems}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading characters.</p>}
            </div>
        );
    }
}

export default CharList;
