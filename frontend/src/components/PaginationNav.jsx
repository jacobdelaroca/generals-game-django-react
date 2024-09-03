import { useEffect, useState } from "react"
import HRDivider from "./HRDivider";

const PaginationNav = ({items, itemsPerPage, setItemsShown, onChange}) => {
    const [page, setPage] = useState(1);
    if(items.length <= itemsPerPage) setItemsShown(items);
    useEffect(() => {
        setItemsShown(items.slice((page-1)*itemsPerPage, page*itemsPerPage))
    }, [items])
    useEffect(() => {
        setItemsShown(items.slice((page-1)*itemsPerPage, page*itemsPerPage));
        const dummy = () => {};
        const toFire = onChange || dummy;
        toFire();
        // onChange();
    }, [page])
    
    const maxPage = Math.floor(items.length / itemsPerPage) + 1;
    const pages = Array.from({ length: maxPage }, (_, i) => i + 1);


    return (
        <>
            {(items.length > itemsPerPage) && 
            
            <>
            <ul className="flex flex-row my-3">
                <PageButton page={"<"} onClick={() => { setPage(p => {
                    if(p === 1) return 1
                    return p - 1;
                    }) }} />
                {/* {items.slice((page-1)*itemsPerPage, page*itemsPerPage).map(() => {})} */}
                {pages.map((p, i) => (<PageButton key={String(i)+"nav"} page={p} currentPage={page} onClick={() => {setPage(p)}}/>))}
                <PageButton page={">"} onClick={() => { setPage(p => {
                    if(p === maxPage) return p
                    return p + 1;
                    }) }} />
            </ul>
            <HRDivider width={"90%"} my={"mb-2"}/>
            </>
            }
        </>
    )
}

const PageButton = ({onClick, page, currentPage}) => {
    return <li onClick={onClick}>
            <button className={`${(page === currentPage) ? "bg-slate-400" : ""} bg-medium-1 text-sm mx-1 hover:bg-slate-300 w-8 border rounded-md aspect-square flex justify-center items-center`}>
                {page}
            </button>
        </li>

}

export default PaginationNav