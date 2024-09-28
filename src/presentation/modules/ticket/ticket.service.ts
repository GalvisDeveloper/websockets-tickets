import { UuidAdapter } from "../../../config/uuid.adapter";
import { Ticket } from "../../../domain/interfaces/ticket";


export class TicketService {

    private readonly tickets: Ticket[] = [
        { id: UuidAdapter.v4(), number: 1, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 2, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 3, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 4, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 5, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 6, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 7, done: false, createdAt: new Date() },
    ];

    public getPendantTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.done);
    }

    public getLastTicketNumber() {
        return this.tickets.slice(-1)[0]?.number ?? 0;
    }

    public createTicket(): Ticket {
        const ticket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.getLastTicketNumber() + 1,
            done: false,
            createdAt: new Date(),
        };
        this.tickets.push(ticket);
        return ticket;
    }

    public assignTicket(): Ticket {
        const ticket = this.getPendantTickets().shift();
        if (!ticket) {
            throw new Error('No pendant tickets');
        }
        return ticket;
    }

    public handleTicket(ticketId: string): Ticket {
        const ticket = this.tickets.find(ticket => ticket.id === ticketId);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.handleAt = new Date();
        return ticket;
    }

    public onFinishTicket = (ticketId: string) => {
        const ticket = this.tickets.find(ticket => ticket.id === ticketId);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        ticket.done = true;
        ticket.doneAt = new Date();
        return ticket;
    }

    public ticketsWorkingOn = () => {
        return this.tickets.filter(ticket => ticket.handleAt);
    }

}