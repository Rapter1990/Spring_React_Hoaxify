<<<<<<< HEAD
package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	UserAuthService userAuthService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		
		http.csrf().disable();
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		// H2 database için
		http.headers().frameOptions().disable();

		// /auth işlemi için buraya tüm durumlar için tanımladık
				// HttpMethod.POST dışında herhangi bir Http request leride permit etsin.
		http
			.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/auth").authenticated()
				.antMatchers(HttpMethod.PUT, "/users/{username}").authenticated()
				.antMatchers(HttpMethod.POST, "/hoaxes").authenticated()
				.antMatchers(HttpMethod.POST, "/hoax-attachments").authenticated()
			.and()
			.authorizeRequests().anyRequest().permitAll();
		

		// Session durumu STATELESS yaptık. (Herhangi bir cookie tutulmayacak)
		// Direk login olmuşmu diye bakıyor herhangi bir authentication işlemi uygulamıyor.
		// O yüzden bu kodu yazdık.
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
=======
package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	UserAuthService userAuthService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		
		http.csrf().disable();
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		// H2 database için
		http.headers().frameOptions().disable();

		// /auth işlemi için buraya tüm durumlar için tanımladık
				// HttpMethod.POST dışında herhangi bir Http request leride permit etsin.
		http
			.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/auth").authenticated()
				.antMatchers(HttpMethod.PUT, "/users/{username}").authenticated()
				.antMatchers(HttpMethod.POST, "/hoaxes").authenticated()
				.antMatchers(HttpMethod.POST, "/hoax-attachments").authenticated()
			.and()
			.authorizeRequests().anyRequest().permitAll();
		

		// Session durumu STATELESS yaptık. (Herhangi bir cookie tutulmayacak)
		// Direk login olmuşmu diye bakıyor herhangi bir authentication işlemi uygulamıyor.
		// O yüzden bu kodu yazdık.
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
>>>>>>> Your message about the commit
