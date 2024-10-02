import { Request, Response } from "express";
import { TicketService } from "./ticket.service";


export class TicketController {

    constructor(
        private readonly ticketService: TicketService,
    ) { }

    public getTickets = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.getTickets() });
    }

    public getLastTicketNumber = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.getLastTicketNumber() });
    }

    public getPendantTickets = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.getPendantTickets() });
    }

    public getWorkingOnTickets = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.ticketsWorkingOn() });
    }

    public createTicket = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.createTicket() });
    }

    public assignTicket = async (req: Request, res: Response) => {
        res.json({ data: this.ticketService.assignTicket(req.params.desk) });
    }

    public doneTicket = async (req: Request, res: Response) => {
        const { ticketId } = req.params;
        res.json({ data: this.ticketService.onFinishTicket(ticketId) });
    }

}