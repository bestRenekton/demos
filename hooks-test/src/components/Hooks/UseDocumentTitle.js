import { useEffect } from 'react';


//使用
//useDocumentTitle("个人中心");

export default function useDocumentTitle(title) {
    useEffect(
        () => {
            document.title = title;
            return () => (document.title = "前端精读");
        },
        [title]
    );
}
