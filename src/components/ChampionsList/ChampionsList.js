import React from 'react';

/* Import CSS */
import './ChampionsList.css';

const ChampionsList = (props) => {
    const champions = props.champions;
    const currentId = props.id;

    return (
        <div className="champions-list">
            <ul>
                {champions.map((champion, index) => {
                    const img = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
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

export default ChampionsList;