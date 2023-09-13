export interface Course {
    id: number;
    name: string;
    credit_hours: number;
    students: Array<Record<string, any>>;
}