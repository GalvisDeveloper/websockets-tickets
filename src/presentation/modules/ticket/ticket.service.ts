import { UuidAdapter } from "../../../config/uuid.adapter";
import { Ticket } from "../../../domain/interfaces/ticket";
import { WssService } from "../websocket/wss.service";


export class TicketService {

    constructor(
        private readonly wssService = WssService.instance,
    ) { }

    private readonly tickets: Ticket[] = [
        { id: UuidAdapter.v4(), number: 1, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 2, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 3, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 4, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 5, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 6, done: false, createdAt: new Date() },
        { id: UuidAdapter.v4(), number: 7, done: false, createdAt: new Date() },
    ];

    public getTickets() {
        return this.tickets;
    }

    private readonly workingOnTickets: Ticket[] = [];

    public getPendantTickets(): Ticket[] {
        return this.tickets.filter(ticket => !ticket.done && !ticket.handleAtDesk);
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
        this.onTicketNumberChange();
        return ticket;
    }

    public assignTicket(desk: string): Ticket {
        const ticket = this.getPendantTickets().shift();
        if (!ticket) {
            throw new Error('No pendant tickets');
        }
        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({ ...ticket });
        this.onTicketNumberChange();
        this.onAssignTicket();
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

    public ticketsWorkingOn = (limit: number = 4) => {
        return this.workingOnTickets.slice(0, limit);
    }

    private onTicketNumberChange = () => {
        this.wssService.sendMessage('on-ticket-count-changed', this.getPendantTickets().length);
    }

    private onAssignTicket = () => {
        this.wssService.sendMessage('on-assign-ticket', this.ticketsWorkingOn());
    }

}