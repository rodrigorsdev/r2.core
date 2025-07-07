export interface IBaseRepository<T> {
    list(): Promise<T[]>;
    getById(id: string): Promise<T>;
    register(item: T): Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): void;
}
