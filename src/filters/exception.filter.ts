import { ArgumentsHost, Catch, ExceptionFilter, HttpException, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from 'src/modules/shared/service/response.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        let res = new ResponseService();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const next = ctx.getNext<ExecutionContext>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const err: any = exception.getResponse();
        // logger.error(`error in request ${request.path}`, {
        //     requestPayload: request.body,
        //     responceDetails: err
        // });
        res.errorResponse(status, err.message != undefined ? err.message : err, response);
    }
}
