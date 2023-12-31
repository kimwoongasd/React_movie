import { useEffect, useRef, useState } from 'react';

// 이미지 파일 선택 창
function FileInput({ name, value, initialPreview, onChange }) {
    // 파일 미리보기 State
    const [preview, setPreview] = useState(initialPreview);

    // Ref 객체 생성 
    const inputRef = useRef();

    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue);
    };


    // 선택 파일 초기화
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = '';
        onChange(name, null);
    };

    // 파일을 선택할 떄마다 미리 보기 주소 변경
    useEffect(() => {
        if (!value) return;
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);
    
        return () => {
            setPreview(initialPreview);
            URL.revokeObjectURL(nextPreview);
        };
    }, [value, initialPreview]);
  
    return (
        <div>
            <img src={preview} alt="이미지 미리보기" />
            <input type="file" accept="image/png, image/jpeg" onChange={handleChange} ref={inputRef}/>
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
}
  
export default FileInput;
  