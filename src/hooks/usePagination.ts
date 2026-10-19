import { useCallback, useState } from "react";
import { clamp } from "@/lib/math";

export type Pagination<T> = {
  pageItems: readonly T[];
  currentPage: number;
  totalPages: number;
  goTo: (page: number) => void;
  prev: () => void;
  next: () => void;
};

export function getTotalPages(itemCount: number, pageSize: number): number {
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function usePagination<T>(items: readonly T[], pageSize: number): Pagination<T> {
  const [requestedPage, setRequestedPage] = useState(0);
  const totalPages = getTotalPages(items.length, pageSize);
  const currentPage = clamp(requestedPage, 0, totalPages - 1);

  const goTo = useCallback(
    (page: number) => setRequestedPage(clamp(page, 0, totalPages - 1)),
    [totalPages],
  );
  const prev = useCallback(() => goTo(currentPage - 1), [goTo, currentPage]);
  const next = useCallback(() => goTo(currentPage + 1), [goTo, currentPage]);

  const start = currentPage * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    goTo,
    prev,
    next,
  };
}

export function pageFromRatio(ratio: number, totalPages: number): number {
  return Math.floor(ratio * totalPages);
}
