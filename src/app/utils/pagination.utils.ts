import { IPaginatedResourceArray } from "../../models/pagination.model";

export class PaginationUtils {
    static paginate<T>(items: T[], page: number = 1, itemsPerPage: number = 5): IPaginatedResourceArray<T> {
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ensure the requested page is within valid bounds.
        const currentPage = Math.max(1, Math.min(page, totalPages));

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

        const paginatedItems = items.slice(startIndex, endIndex);

        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        return {
            page: currentPage,
            nextPage: nextPage,
            prevPage: prevPage,
            totalPages: totalPages,
            items: paginatedItems
        };
    }
}