import PagingBarCSS from './PagingBar.module.css';

function PagingBar({ pageInfo, setCurrentPage }) {

    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <div  className ={PagingBarCSS.memberPaging}>
            <button 
                className={ PagingBarCSS.pagingBtn }
                onClick={ () => setCurrentPage(1) }
                disabled={ pageInfo.currentPage <= 1 }
            >
                &lt;&lt;
            </button>
            <button 
                className={ PagingBarCSS.pagingBtn }
                onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                disabled={ pageInfo.currentPage <= 1 }
            >
                &lt;
            </button>
            { pageNumber.map(num => (
                <li key={num} onClick={ () => setCurrentPage(num) }>
                    <button 
                        className={ PagingBarCSS.pagingBtn }
                        style={ pageInfo.currentPage === num ? { backgroundColor : 'orange' } : null }
                    >
                        {num}
                    </button>
                </li>
            ))
            }
            <button 
                className={ PagingBarCSS.pagingBtn }
                onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                disabled={ pageInfo.currentPage <= pageInfo.maxPage }
            >
                &gt;
            </button>
            <button 
                className={PagingBarCSS.pagingBtn}
                onClick={() => setCurrentPage(pageInfo.maxPage)}
                disabled={pageInfo.currentPage <= pageInfo.maxPage}
            >
                &gt;&gt;
            </button>

        </div>
    );
}

export default PagingBar;