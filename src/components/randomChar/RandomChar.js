import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../server/Server";
import {Component} from "react";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();

    updateChar = () => {
        this.setState({ loading: true,error: false },() => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            this.marvelService
                .getCharacter(id)
                .then(this.onCharLoaded)
                .catch(this.errorMes);
        });

    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    errorMes = () =>{
        this.setState({
            loading: false,
            error:true})
    }


    render() {
        const {char, loading, error} = this.state;
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? <View char={char}/> : null

        return (
            <div className="randomchar">
                {spinner}
                {content}
                {errorMessage}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )


    }
}
    const View = ({char}) =>{
    const {name, description, thumbnail, homepage, wiki} = char
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>)
    }



export default RandomChar;