// 최상위 컴포넌트
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from '../api'

// 페이지네이션 최대 개수
const LIMIT = 6;

function App() {
    // 삭제 State
    const [items, setItems] = useState([]);

    // 정렬 State
    const [order, setOrder] = useState('createdAt');

    // 페이지네이션 State
    const [offset, setOffset] = useState(0);
    // 더보기 버튼 활성/비활성화 State
    const [hasNext, setHasNext] = useState(false);
    // 네트워크 로딩 State
    const [isLoading, setIsLoading] = useState(false);
    // 네트워크 에러처리 State
    const [loadingError, setLoadingError] = useState(null);

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

    // 네트워크에서 데이터를 받아와 items State 변경
    const handleLoad = async (options) => {
        let result;
        try {
            setLoadingError(null);
            setIsLoading(true);
            result = await getReviews(options);
        } catch (error) {
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        const { paging, reviews } = result;
        // offset이 0이라면 items 전체를 바꾼다
        if (options.offset === 0) {
            setItems(reviews);
        } else { // 아니라면 이전값을 배열로 같이 가져온다
            setItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + options.limit);
        setHasNext(paging.hasNext);
    };

    // 다음 페이지 함수
    const handleLoadMore = async () => {
        await handleLoad({ order, offset, limit: LIMIT });
    };

    // useEffect 함수를 사용해서 무한루프를 벗어난다
    // 정렬값이 바뀔 때 마다 서버에서 정렬된 데이터를 얻는다 
    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order]);

    return (
    <div>
        <div>
            <button onClick={handelNewestClick}>최신순</button>
            <button onClick={handelBesttClick}>베스트순</button>
        </div>
        <div>
            <ReviewList items={sortedItems} onDelete={handelDelte} />
            {hasNext && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
        </div>
        {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
    );
}

export default App;