// 별점 컴포넌트
import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating = 0, onSelect, onHover }) {
    const className = `Rating-star ${selected ? 'selected' : ''}`;

    // 별점을 클릭했을 떄 값
    const handleClick = onSelect ? () => onSelect(rating) : undefined;

    // 별 모양에 마우스를 올렸을 때 해당하는 별 값
    const handleMouesOver = onHover ? () => onHover(rating) : undefined;

    return (
        <span
        className={className}
        onClick={handleClick}
        onMouseOver={handleMouesOver}
        >
        ★
        </span>
    );
}

// onMouseOut : 마우스가 영역을 벗어나면 실행할 함수
function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
    return (
        <div className={className} onMouseOut={onMouseOut}>
        {RATINGS.map((rating) => (
            <Star
            key={rating}
            selected={value >= rating}
            rating={rating}
            onSelect={onSelect}
            onHover={onHover}
            />
        ))}
        </div>
    );
}

export default Rating;