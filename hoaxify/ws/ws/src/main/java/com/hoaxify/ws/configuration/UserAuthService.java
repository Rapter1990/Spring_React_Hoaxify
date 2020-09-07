<<<<<<< HEAD
package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.model.User;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.service.UserService;

// Authentication olduğunda user bulabilmek için UserAuthService yazdık
@Service
public class UserAuthService implements UserDetailsService{

	@Autowired
	UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User inDB = userService.getByUsername(username);
		if(inDB == null)
			throw new UsernameNotFoundException("User not found");
		//return new HoaxifyUserDetails(inDB);
		return inDB;
	}

}
=======
package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.model.User;
import com.hoaxify.ws.repository.UserRepository;
import com.hoaxify.ws.service.UserService;

// Authentication olduğunda user bulabilmek için UserAuthService yazdık
@Service
public class UserAuthService implements UserDetailsService{

	@Autowired
	UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User inDB = userService.getByUsername(username);
		if(inDB == null)
			throw new UsernameNotFoundException("User not found");
		//return new HoaxifyUserDetails(inDB);
		return inDB;
	}

}
>>>>>>> Your message about the commit
