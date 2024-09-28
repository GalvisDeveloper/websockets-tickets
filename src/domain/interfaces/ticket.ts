

export interface Ticket {
    id: string;
    number: number;
    done: boolean;
    createdAt: Date;
    handleAtDest?: string; // desktop #
    handleAt?: Date;
    doneAt?: Date;
}