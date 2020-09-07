<<<<<<< HEAD
package com.hoaxify.ws.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.customannotation.CurrentUser;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.jacksonview.Views;
import com.hoaxify.ws.model.User;
import com.hoaxify.ws.projection.UserProjection;
import com.hoaxify.ws.projection.UserUpdateVM;
import com.hoaxify.ws.projection.UserVM;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.response.GenericResponse;
import com.hoaxify.ws.service.UserService;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;

	//@CrossOrigin react uygulamında package.json'da proxy tanımladığımız için buna gerek kalmadı.
	@PostMapping("/users")
	// Response Olayı şu şekilde olabilirdi 201 Created Mesajını almak için
	// @ResponseStatus(HttpStatus.CREATED)
	// Gelen user ilk başta @Valid kısmından geçiyor 
	public GenericResponse createUser(@Valid @RequestBody User user) {		
		userService.save(user);
		return new GenericResponse("user created");
	}
	
	
	// Buradaki olayı Error Handler kısmına ekledik
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
//		ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//		
//		for(FieldError fieldError: exception.getBindingResult().getFieldErrors()) {
//			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//		}
//		
//		error.setValidationErrors(validationErrors);
//		return error;
//	}
	
	@GetMapping("/users")
	//@JsonView(Views.Base.class)
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		
		// 1.YOL
		/*
		return userService.getUsers(page).map(new Function<User, UserVM>() {

			@Override
			public UserVM apply(User t) {
				// TODO Auto-generated method stub
				UserVM uservm = new UserVM(t);
				return uservm;
			}
			
		});*/
		
		// 2.YOL
		return userService.getUsers(page, user).map(UserVM::new);
	}
	
	
	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username")
	UserVM updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username) {
		User user = userService.updateUser(username, updatedUser);
		return new UserVM(user);
	}

}
=======
package com.hoaxify.ws.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.customannotation.CurrentUser;
import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.jacksonview.Views;
import com.hoaxify.ws.model.User;
import com.hoaxify.ws.projection.UserProjection;
import com.hoaxify.ws.projection.UserUpdateVM;
import com.hoaxify.ws.projection.UserVM;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.response.GenericResponse;
import com.hoaxify.ws.service.UserService;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;

	//@CrossOrigin react uygulamında package.json'da proxy tanımladığımız için buna gerek kalmadı.
	@PostMapping("/users")
	// Response Olayı şu şekilde olabilirdi 201 Created Mesajını almak için
	// @ResponseStatus(HttpStatus.CREATED)
	// Gelen user ilk başta @Valid kısmından geçiyor 
	public GenericResponse createUser(@Valid @RequestBody User user) {		
		userService.save(user);
		return new GenericResponse("user created");
	}
	
	
	// Buradaki olayı Error Handler kısmına ekledik
//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
//		ApiError error = new ApiError(400, "Validation error", "/api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//		
//		for(FieldError fieldError: exception.getBindingResult().getFieldErrors()) {
//			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//		}
//		
//		error.setValidationErrors(validationErrors);
//		return error;
//	}
	
	@GetMapping("/users")
	//@JsonView(Views.Base.class)
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		
		// 1.YOL
		/*
		return userService.getUsers(page).map(new Function<User, UserVM>() {

			@Override
			public UserVM apply(User t) {
				// TODO Auto-generated method stub
				UserVM uservm = new UserVM(t);
				return uservm;
			}
			
		});*/
		
		// 2.YOL
		return userService.getUsers(page, user).map(UserVM::new);
	}
	
	
	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username")
	UserVM updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username) {
		User user = userService.updateUser(username, updatedUser);
		return new UserVM(user);
	}

}
>>>>>>> Your message about the commit
