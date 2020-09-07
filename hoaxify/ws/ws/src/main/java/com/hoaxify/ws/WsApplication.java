package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import com.hoaxify.ws.model.Hoax;
import com.hoaxify.ws.model.User;
import com.hoaxify.ws.projection.HoaxSubmitVM;
import com.hoaxify.ws.service.HoaxService;
import com.hoaxify.ws.service.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}
	
	// Uygulama çalıştığında ilk olarak(initial ) bir tane user eklenecek
	/*@Bean
	  @Profile("dev")  // application.yaml'daki spring.profiles.active deki -dev olduğundan burası çalışacak uygun profile göre çalıştırma
	CommandLineRunner createInitialUsers(UserService userService) {
		
		// 1. Yol (lambda -> run(String... args) kısımda bir tane method (run gibi) varsa return(args)-> kullanabiliriz)
		return (args) -> {
			User user = new User();
			user.setUsername("user1");
			user.setDisplayName("display1");
			user.setPassword("P4ssword");
			userService.save(user);
		};
		
		// 2.Yol
		/*return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				// TODO Auto-generated method stub
				User user = new User();
				user.setUsername("user1");
				user.setDisplayName("display1");
				user.setPassword("P4ssword");
				userService.save(user);
			}
		};
	
	}*/
	
	@Bean
	CommandLineRunner createInitialUsers(UserService userService , HoaxService hoaxService) {
		return (args) -> {
			/*for(int i = 3; i<=10;i++) {				
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				userService.save(user);
			}*/
			
			/*for(int i = 1;i<=50;i++) {
				Hoax hoax = new Hoax();
				hoax.setContent("hoax - " +i);
				hoaxService.save(hoax);
			}*/
			
			/*for(int i = 1; i<=40;i++) {				
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("P4ssword");
				userService.save(user);
			
				for(int j = 1;j<=2;j++) {
					HoaxSubmitVM hoax = new HoaxSubmitVM();
					hoax.setContent("hoax (" +j + ") from user ("+i+")");
					hoaxService.save(hoax, user);
				}
			
			}*/
			
		};
	}

}
