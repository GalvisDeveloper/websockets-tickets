import { Request, Response } from "express";


export class TicketController {

    constructor() { }

    public getTickets = async (req: Request, res: Response) => {
        res.json({ message: 'getTickets' });
    }

    public createTicket = async (req: Request, res: Response) => {
        res.json({ message: 'createTicket' });
    }

    public assignTicket = async (req: Request, res: Response) => {
        res.json({ message: 'assignTicket' });
    }

    public doneTicket = async (req: Request, res: Response) => {
        res.json({ message: 'doneTicket' });
    }


}