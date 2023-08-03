import { useState } from 'react';
import Rating from './Rating';
import './RatingInput.css';

// name, value은 HTMP input에서 사용하는 name, value처럼 input의 값과 이름
// onChange은 input을 선택했을 때 살행 할 함수
function RatingInput({ name, value, onChange }) {
    // 별점을 선택하거나 마우스를 올렸을 때 미리 보여주는데 사용할 값
    const [rating, setRating] = useState(value);

    const handleSelect = (nextValue) => onChange(name, nextValue);
    // 마우스가 벗어 났을 경우 원래 값으로 복원
    const handleMouseOut = () => setRating(value);

    return (
        <Rating
        className="RatingInput"
        value={rating}
        onSelect={handleSelect}
        onHover={setRating}
        onMouseOut={handleMouseOut}
        />
    );
}

export default RatingInput;