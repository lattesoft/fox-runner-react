import React, {useState,useEffect} from 'react'

export default function ItemComponent(props) {
    const [item, setItem] = useState({
        left: window.innerWidth,
        foxCurrent: props.foxCurrent,
        isPass: false
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setItem(prevItem => {
                let nextLeft = prevItem.left - 2;
                if (props.foxStatus() === "standing") {
                    clearInterval(interval)
                }
                if(nextLeft <= -100){
                    props.removeItem(props.componentKey);
                }
                let itemDiffFox = nextLeft - props.getFoxCurrent().offsetLeft;
                if (!prevItem.isPass) {
                    if (itemDiffFox > 50 && itemDiffFox < 100) {
                        prevItem.isPass = true;
                        if (props.foxStatus() === "running") {
                            props.removeItem(props.componentKey);
                            props.keepItem(props.item);
                        }
                    }
                }

                return {
                    ...prevItem,
                    left: nextLeft
                };
            });
        }, 10)
        return () => {
            clearInterval(interval)
        };
    }, []);
    
    return (
        <div className="barrier-object" style={{ left: item.left }}>
            <div className="item-hp">{props.item.hp > 0 ? "+"+props.item.hp : props.item.hp}</div>
            <img width="50" src={props.item.url} alt="Item" />
        </div>
    )
}