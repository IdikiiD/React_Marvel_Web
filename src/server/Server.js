

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=a59d4f3c86d00be5489803bebb31aef9'
    getResource = async (url) =>{
        let res = await fetch(url)

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacter = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCaracter(res.data.results[0])
    }

    _transformCaracter = (char)=>{
        return{
            name:char.name,
            description:char.description ? ` ${char.description.slice(0,210)}...`: 'There is no description about hero',
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url
        }

    }

}

export default MarvelService