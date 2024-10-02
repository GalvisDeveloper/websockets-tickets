import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";


export class TicketRoutes {


    static get routes() {
        const router = Router();

        const ticketService = new TicketService();
        const ticketController = new TicketController(ticketService);

        router.get('/', ticketController.getTickets);
        router.get('/last', ticketController.getLastTicketNumber);
        router.get('/pendant', ticketController.getPendantTickets);
        router.get('/workingOn', ticketController.getWorkingOnTickets);
        router.post('/', ticketController.createTicket);

        router.patch('/assign/:desk', ticketController.assignTicket);
        router.patch('/done/:ticketId', ticketController.doneTicket);



        return router;
    }

}