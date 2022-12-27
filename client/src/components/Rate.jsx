// https://github.com/iradualbert/star-ratings
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

export default function Rate({ rating, setRating, disabled }) {
    const [ currentValue, setCurrentValue ] = [rating, setRating];
    const [ hoverValue, setHoverValue ] = useState(undefined);
    const stars = Array(5).fill(0);

    const handleClick = value => {
	setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
	setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
	setHoverValue(undefined)
    }

    const colors = {
	orange: "#FFBA5A",
	grey: "#a9a9a9"
    };

    const starsStyle = {
	display: "flex",
	flexDirection: "row",
    }

    return (
	<>
	    <div style={starsStyle}>
		{stars.map((_, index) => {
		    return (
			<FaStar
			    key={index}
			    size={24}
			    onClick={() => { if (!disabled) handleClick(index + 1) }}
			    onMouseOver={() => { if (!disabled) handleMouseOver(index + 1) }}
			    onMouseLeave={() => { if (!disabled) handleMouseLeave() }}
			    color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
			    style={{
				marginRight: 10,
				cursor: "pointer"
			    }}
			/>
		    )
		})}
	    </div>
	</>
    )
}
