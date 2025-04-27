export * from '@tanstack/react-table';
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        action: (state: string, id: number) => void
    }
}
