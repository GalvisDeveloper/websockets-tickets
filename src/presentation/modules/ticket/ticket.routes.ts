import { Router } from "express";
import { TicketController } from "./ticket.controller";


export class TicketRoutes {


    static get routes() {
        const router = Router();

        const ticketController = new TicketController();

        router.get('/', ticketController.getTickets);
        router.post('/', ticketController.createTicket);

        router.get('/assign/:desk', ticketController.assignTicket);
        router.put('/done/:ticketId', ticketController.doneTicket);



        return router;
    }

}