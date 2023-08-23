import { useState } from "react";
import './ReviewForm.css';
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";


// Values State의 초기값
const INITIAL_VALUES = {
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
}

function ReviewForm({ 
    initialValues = INITIAL_VALUES, 
    initialPreview, 
    onSubmitSuccess,  
    onCancle ,
    onSubmit,
}) {
    const [values, setValues] = useState(initialValues);
    // 생성 버튼 여러번 누를 수 있으니 로딩과 에러 State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Values State 값을 사용해서 FormData를 만든다
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('rating', values.rating);
        formData.append('content', values.content);
        formData.append('imgFile', values.imgFile);

        let result;
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            result = await onSubmit(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
        }

        const { review } = result;
        onSubmitSuccess(review);
        // 리퀘스트 끝나면 폼을 초기화
        setValues(INITIAL_VALUES);
    };
    
    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput name="imgFile" value={values.imgFile} initialPreview={initialPreview} onChange={handleChange} />
            <input name="title" value={values.title} onChange={handleInputChange} />
            <RatingInput name="rating" type="number" value={values.rating} onChange={handleChange} />
            <textarea name="content" value={values.content} onChange={handleInputChange} />
            <button disabled={isSubmitting} type="submit">
                확인
            </button>
            {onCancle && <button onClick={onCancle}>
                취소
            </button>}
            {submittingError && <div>{submittingError.message}</div>}
        </form>
    );
}

export default ReviewForm;