export interface PaginationProps {
  arr: number[];
  onClick: (obj:number) => void;
  currentPage: number;
  totalCount: number;
  currentArr: [];
}
