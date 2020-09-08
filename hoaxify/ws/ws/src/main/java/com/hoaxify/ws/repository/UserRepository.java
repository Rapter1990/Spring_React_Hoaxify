package com.hoaxify.ws.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hoaxify.ws.model.User;
import com.hoaxify.ws.projection.UserProjection;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);

	/*@Query(value="Select u from User u")
	Page<UserProjection> getAllUsersProjection(Pageable page);*/
	
	Page<User> findByUsernameNot(String username, Pageable page);
	
	@Transactional
	void deleteByUsername(String username);
}
