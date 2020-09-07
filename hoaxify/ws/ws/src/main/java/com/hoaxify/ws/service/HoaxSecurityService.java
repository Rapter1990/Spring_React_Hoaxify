package com.hoaxify.ws.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.model.Hoax;
import com.hoaxify.ws.model.User;
import com.hoaxify.ws.repository.HoaxRepository;


@Service(value = "hoaxSecurity")
public class HoaxSecurityService {

	@Autowired
	HoaxRepository hoaxRepository;

	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Hoax> optionalHoax = hoaxRepository.findById(id);
		if(!optionalHoax.isPresent()) {
			return false;
		}

		Hoax hoax = optionalHoax.get();
		if(hoax.getUser().getId() != loggedInUser.getId()) {
			return false;
		}

		return true;
	}

}
