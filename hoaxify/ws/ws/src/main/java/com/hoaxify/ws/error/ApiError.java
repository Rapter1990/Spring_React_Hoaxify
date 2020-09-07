<<<<<<< HEAD
package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.jacksonview.Views;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) 
// Jackson olarak ApiError Null olmayanlar attributeları (bir tek auth işleminde validationErrors) json olarak döndür
public class ApiError {

	//@JsonView(Views.Base.class)
	private int status;

	//@JsonView(Views.Base.class)
	private String message;

	//@JsonView(Views.Base.class)
	private String path;

	//@JsonView(Views.Base.class)
	private long timestamp = new Date().getTime();

	private Map<String, String> validationErrors;

	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}

}
=======
package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.jacksonview.Views;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) 
// Jackson olarak ApiError Null olmayanlar attributeları (bir tek auth işleminde validationErrors) json olarak döndür
public class ApiError {

	//@JsonView(Views.Base.class)
	private int status;

	//@JsonView(Views.Base.class)
	private String message;

	//@JsonView(Views.Base.class)
	private String path;

	//@JsonView(Views.Base.class)
	private long timestamp = new Date().getTime();

	private Map<String, String> validationErrors;

	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}

}
>>>>>>> Your message about the commit