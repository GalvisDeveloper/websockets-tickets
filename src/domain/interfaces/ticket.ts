

export interface Ticket {
    id: string;
    number: number;
    done: boolean;
    createdAt: Date;
    handleAtDesk?: string; // desktop #
    handleAt?: Date;
    doneAt?: Date;
}