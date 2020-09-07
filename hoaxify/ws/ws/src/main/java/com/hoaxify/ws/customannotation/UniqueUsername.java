<<<<<<< HEAD
package com.hoaxify.ws.customannotation;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.hoaxify.ws.validator.UniqueUsernameValidator;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueUsernameValidator.class })
public @interface UniqueUsername {

	String message() default "{hoaxify.constraint.username.UniqueUsername.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
=======
package com.hoaxify.ws.customannotation;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.hoaxify.ws.validator.UniqueUsernameValidator;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueUsernameValidator.class })
public @interface UniqueUsername {

	String message() default "{hoaxify.constraint.username.UniqueUsername.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
>>>>>>> Your message about the commit
