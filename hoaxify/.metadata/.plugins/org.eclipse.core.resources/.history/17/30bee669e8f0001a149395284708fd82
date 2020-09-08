package com.hoaxify.ws.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.model.User;
import com.hoaxify.ws.projection.UserProjection;
import com.hoaxify.ws.projection.UserUpdateVM;
import com.hoaxify.ws.repository.UserRepository;

@Service
public class UserService {

	// 1.Yol
	@Autowired
	UserRepository userRepository;
	
	/* 2. Yol
	UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}*/
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	FileService fileService;
	

	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	public Page<User> getUsers(Pageable page, User user) {
		if(user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		if(updatedUser.getImage() != null) {
			String oldImageName = inDB.getImage();
			try {
				String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
				inDB.setImage(storedFileName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileService.deleteProfileImage(oldImageName);
		}
		return userRepository.save(inDB);
	}
}
