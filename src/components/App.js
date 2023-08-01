// 최상위 컴포넌트
import ReviewList from "./ReviewList";
import mockitems from '../mock.json';
import { useState } from "react";

function App() {
    // 삭제 State
    const [items, setItems] = useState(mockitems);

    // 정렬 State
    const [order, setOrder] = useState('createdAt');
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    // 최신순과 평점순 정렬 핸들러
    const handelNewestClick = () => setOrder('createdAt');
    const handelBesttClick = () => setOrder('rating');

    // 삭제 핸들러
    const handelDelte = (id) => {
        // 삭제 id를 제외하고 다시 생성
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    }

    return (
    <div>
        <div>
            <button onClick={handelNewestClick}>최신순</button>
            <button onClick={handelBesttClick}>베스트순</button>
        </div>
        <ReviewList items={sortedItems} onDelete={handelDelte} />
    </div>
    );
}

export default App;