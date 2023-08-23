import './ReviewList.css';
import Rating from './Rating';
import ReviewForm from './ReviewForm';
import { useState } from 'react';

// 날짜 수정 함수
function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// 리뷰 상세정보
function ReviewListItem({ item, onDelete, onEdit }) {
    const hnadleDeleteClick = () => onDelete(item.id);

    // 글 수정
    const handleEditClick = () => {
        onEdit(item.id);
    }

    return (
        <div className="ReviewListItem">
        <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
        <div>
            <h1>{item.title}</h1>
            <Rating value={item.rating} />
            <p>{formatDate(item.createdAt)}</p>
            <p>{item.content}</p>
            <button onClick={hnadleDeleteClick}>삭제</button>
            <button onClick={handleEditClick}>수정</button>
        </div>
        </div>
    );
}

// 리뷰 리스트 보여주기
function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => setEditingId(null);

    return (
        <ul>
            {items.map((item) => {
                if (item.id === editingId) {
                    const { id, imgUrl, title, rating, content } = item;
                    const initialValues = { title, rating, content, imgFile: null }
                    
                    const handleSubmit = (formData) => onUpdate(id, formData);

                    const handleSubmitSuccess = (review) => {
                        onUpdateSuccess(review);
                        setEditingId(null);
                    };

                    return (
                        <li key={item.id}>
                            <ReviewForm
                            initialValues={initialValues} 
                            initialPreview={imgUrl}
                            onCancle={handleCancel}
                            onSubmit={handleSubmit}
                            onSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                }
                return(
                    <li key={item.id}>
                        <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
                    </li>
                );
            })}
        </ul>
    );
}

export default ReviewList;
