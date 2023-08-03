import './ReviewList.css';
import Rating from './Rating';

// 날짜 수정 함수
function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// 리뷰 상세정보
function ReviewListItem({ item, onDelete }) {
    const hnadleDeleteClick = () => onDelete(item.id);
    return (
        <div className="ReviewListItem">
        <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
        <div>
            <h1>{item.title}</h1>
            <Rating value={item.rating} />
            <p>{formatDate(item.createdAt)}</p>
            <p>{item.content}</p>
            <button onClick={hnadleDeleteClick}>삭제</button>
        </div>
        </div>
    );
}

// 리뷰 리스트 보여주기
function ReviewList({ items, onDelete }) {
    return (
    <ul>
        {items.map((item) => {
        return(
            <li key={item.id}>
                <ReviewListItem item={item} onDelete={onDelete} />
            </li>)
        })}
    </ul>
    );
}

export default ReviewList;
