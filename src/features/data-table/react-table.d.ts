export * from '@tanstack/react-table';
declare module '@tanstack/react-table' {
    interface TableMeta {
        action: (state: string, id: number) => void
    }
}
