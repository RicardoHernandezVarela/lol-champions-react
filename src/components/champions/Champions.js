import React, { Component, Fragment } from 'react';

/* Import css */
import './Champions.css';

class Champions extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            champions: [],
            img: null,
            info: null
        };
    }

    createChampionsArray = (response, keys) => {
        const champions = keys.map((key) => {
            return response[key];
        });
    
        return champions
    };

    getIndividualInfo =  (champions) => {
        const champs = champions.map(async (champion) => {
            try {
                const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/10.3.1/data/en_US/champion/${champion.id}.json`)
                const indChamp = await response.json();
                const data = indChamp.data[champion.id]

                return {
                    ...champion,
                    ...data
                }
            } catch (error) {
                return {
                    ...champion
                }
            }
        });

        return Promise.all(champs);
    }

    getAllChampions = async () => {
        this.setState({loading: true});

        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/10.3.1/data/en_US/champion.json');
        const responseData = await response.json();
    
        const champiosData = await responseData.data;
    
        const championsArr = await this.createChampionsArray(champiosData, Object.keys(champiosData));
        
        const individuals = await this.getIndividualInfo(championsArr);
        //console.log(individuals);

        this.setState({
            champions: individuals,
            loading: false
        });
    };

    handleClick = (info, img) => {
        //console.log(info);

        this.setState({
            info: info,
            img: img
        })
    }

    componentDidMount() {
        this.getAllChampions();
    }
    
    render(){
        const { champions, img, info, loading } = this.state;

        return(
            <div className="champions">
                <h1>LOL CHAMPIONS</h1>
                {loading &&
                    <h1>Loading...</h1>
                }

                <ChampionsList champions={champions} handleClick={this.handleClick}/>
                
                <div className="champion-info">
                    <h4>Select a Champion</h4>
                    {info && 
                        <Fragment>
                            <img src={img} alt="champion"/>
                            <p>{info}</p>
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}

const ChampionsList = (props) => {
    const champions = props.champions;
    
    return (
        <div className="champions-list">
            <ul>
                {champions.map((champion, index) => {
                    const img = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
                    return (
                        
                        <li key={index} onClick={() => props.handleClick(champion.blurb, img)}>
                            <img src={img} alt="champion"/>
                            <span>{champion.name}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Champions;