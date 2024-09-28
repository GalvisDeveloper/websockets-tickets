import { Router } from 'express';
import { TicketRoutes } from './modules/ticket/ticket.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/tickets', TicketRoutes.routes);


    return router;
  }


}

