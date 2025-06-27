package com.example.project.exception;

import com.example.project.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice // Позволяет обрабатывать исключения во всех контроллерах и возвращать ответы
// напрямую в теле (вроде так я не знаю не удаляйте комментарий мне нужен для понимания)

public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class) // 404
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException exception,
                                                                HttpServletRequest request) {
        return buildErrorResponse(exception, HttpStatus.NOT_FOUND, "Resource Not Found", request.getRequestURI());
    }

    @ExceptionHandler(OperationNotAllowedException.class) // 403
    public ResponseEntity<ErrorResponse> handleOperationNotAllowed(OperationNotAllowedException exception,
                                                                   HttpServletRequest request) {
        return buildErrorResponse(exception, HttpStatus.FORBIDDEN, "Operation Not Allowed", request.getRequestURI());
    }

    @ExceptionHandler(CustomAuthenticationException.class) // 401
    public ResponseEntity<ErrorResponse> handleAuthenticationException(CustomAuthenticationException exception,
                                                                       HttpServletRequest request) {
        return buildErrorResponse(exception, HttpStatus.UNAUTHORIZED, "Authentication Failed", request.getRequestURI());
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceAlreadyExists(ResourceAlreadyExistsException exception,
                                                                     HttpServletRequest request) {
        return buildErrorResponse(exception, HttpStatus.CONFLICT, "Resource Already Exists", request.getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception exception,
                                                                HttpServletRequest request) {
        return buildErrorResponse(exception, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", request.getRequestURI());
    }


    private ResponseEntity<ErrorResponse> buildErrorResponse(Exception exception, HttpStatus httpStatus,
                                                             String error, String requestURI) {
        ErrorResponse response = new ErrorResponse(
                LocalDateTime.now(), httpStatus.value(), error,
                exception.getMessage(), requestURI);
        return new ResponseEntity<>(response, httpStatus);
    }
}
