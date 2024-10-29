import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../server/Server";
import {Component} from "react";

class RandomChar extends Component{
constructor(props) {
    super(props);
    this.updateChar()
}
    state = {
        name:null,
        desc:null,
        thumbnail:null,
        homepage:null,
        wiki:null,
    }
    marvelService = new MarvelService();

    updateChar = (res) => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id).then(
            res => {
                this.setState({
                    name:res.data.results[0].name,
                    desc:res.data.results[0].desc,
                    thumbnail:res.data.results[0].thumbnail.path+ '.' + res.data.results[0].thumbnail.extension,
                    homepage:res.data.results[0].url,
                    wiki:res.data.results[0].urls[1].url,
                })
            }
        )
}

    render(){
        const { name, desc, thumbnail, homepage, wiki} = this.state;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {desc}
                        </p>
                        <div className="randomchar__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">{homepage}</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">{wiki}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}

export default RandomChar;