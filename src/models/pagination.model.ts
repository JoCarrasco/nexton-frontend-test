export interface IPaginatedResourceArray<T> {
    page: number,
    nextPage: number | null,
    prevPage: number | null,
    totalPages: number,
    items: T[]
}