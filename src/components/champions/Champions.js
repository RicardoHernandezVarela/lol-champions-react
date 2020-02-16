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
            info: null,
            title: null,
            id: null,
            error: null
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

        try {
            const response = await fetch('http://ddragon.leagueoflegends.com/cdn/10.3.1/data/en_US/champion.json');

            const responseData = await response.json();
        
            const championsData = responseData.data;
        
            const championsArr = this.createChampionsArray(championsData, Object.keys(championsData));
            
            const individuals = await this.getIndividualInfo(championsArr);
            //console.log(individuals);
    
            this.setState({
                champions: individuals,
                info: individuals[0].lore,
                img: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${individuals[0].id}_0.jpg`,
                title: individuals[0].title.toUpperCase(),
                id: individuals[0].id,
                loading: false
            });

        } catch (error) {
            console.log(error.message);

            this.setState({
                error: "Error fetching data",
                loading: false
            });
        }
    };

    handleClick = (info, img, title, id) => {
        //console.log(info);

        this.setState({
            info: info,
            img: img,
            title: title.toUpperCase(),
            id: id
        })
    }

    componentDidMount() {
        this.getAllChampions();
    }
    
    render(){
        const { champions, img, info, title, id, loading, error } = this.state;

        if (loading) {
            return(
                <h2>Loading...</h2>
            )
        }

        if (error) {
            return(
                <h2>{error}</h2>
            )
        }

        return (
            <Fragment>
                <ChampionsList 
                    champions={champions} 
                    handleClick={this.handleClick}
                    id={id}
                />

                <div className="champion-info">
                    <span>{title}</span>
                    <img src={img} alt="champion"/>
                    <p>{info}</p>
                </div>
            </Fragment>
        )

    }
}

const ChampionsList = (props) => {
    const champions = props.champions;
    const currentId = props.id;

    return (
        <div className="champions-list">
            <ul>
                {champions.map((champion, index) => {
                    const img = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
                    const { lore, title, id} = champion;

                    const selected = id === currentId;

                    return (
                        
                        <li className={selected ? "selected": null} key={index} onClick={() => props.handleClick(lore, img, title, id)}>
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