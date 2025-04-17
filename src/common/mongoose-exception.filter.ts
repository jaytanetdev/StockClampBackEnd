import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';

@Catch(MongooseError, MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError | MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ถ้าเป็น ValidationError ของ Mongoose
    if (exception instanceof MongooseError.ValidationError) {
      const errors = Object.values(exception.errors).map((err: any) => ({
        field: err.path,
        message: err.message,
      }));

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation Error',
        errors,
      });
    }

    // ถ้าเป็น Duplicate Key (MongoServerError code 11000)
    if ('code' in exception && exception.code === 11000) {
      const fields = Object.keys((exception as any).keyValue ?? {});

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'Duplicate Key Error',
        fields,
      });
    }

    // ถ้าไม่ตรงเคสข้างบน ตอบ 500 ทั่วไป
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: exception.message || 'Unexpected error',
    });
  }
}
