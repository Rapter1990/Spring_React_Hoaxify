package com.hoaxify.ws.customannotation;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.hoaxify.ws.validator.FileTypeValidator;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { FileTypeValidator.class })
public @interface FileType {

	String message() default "{hoaxify.constraint.FileType.message}";
	Class<?>[] groups() default { };
	Class<? extends Payload>[] payload() default { };
	String[] types();
}
