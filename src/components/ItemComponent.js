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
                            clearInterval(interval)
                            props.endGame();
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
    
    return <img style={{ left: item.left }} className="barrier-object" src={props.item.url} alt="Item" />
}