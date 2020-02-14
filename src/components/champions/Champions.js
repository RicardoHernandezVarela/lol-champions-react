import React, { Component } from 'react';

/* Import css */
import './Champions.css';

class Champions extends Component {
    constructor() {
        super();

        this.state = {
            champions: [],
            img: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/AurelionSol_0.jpg',
            info: ''
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
        const response = await fetch('http://ddragon.leagueoflegends.com/cdn/10.3.1/data/en_US/champion.json');
        const responseData = await response.json();
    
        const champiosData = await responseData.data;
    
        const championsArr = await this.createChampionsArray(champiosData, Object.keys(champiosData));
        
        const individuals = await this.getIndividualInfo(championsArr);
        //console.log(individuals);

        this.setState({
            champions: individuals
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
        const { champions, img, info } = this.state;

        return(
            <div className="champions">
                <h1>LOL CHAMPIONS</h1>
                <ChampionsList champions={champions} handleClick={this.handleClick}/>
                
                <div className="champion-info">
                    <img src={img} alt="champion"/>
                    <p>{info}</p>
                </div>
            </div>
        )
    }
}

const ChampionsList = (props) => {
    const champions = props.champions;
    
    return (
        <ul className="champions-list">
            {champions.map((champion, index) => {
                const img = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
                return (
                    
                    <li key={index}>
                        <img src={img} alt="champion"/>
                        <span onClick={() => props.handleClick(champion.blurb, img)}>{champion.name}</span>
                    </li>
                );
            })}
        </ul>

    );
}

export default Champions;